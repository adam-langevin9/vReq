import type { VisualTitleDTO } from "@/services/VisualDataService";
import { defineStore } from "pinia";
import { computed, ref, watch, watchEffect, type Ref } from "vue";
import { useCourseFlow } from "./CourseFlow.store";
import { createVisual, readVisual, readTitles, updateVisual, deleteVisual } from "@/services/VisualDataService";
import { useUser } from "./User.store";
import { useStorage, type RemovableRef } from "@vueuse/core";
import { useEditor } from "./Editor.store";

export const useVisual = defineStore("Visual", () => {
  // stores
  const courseFlow = useCourseFlow();
  const user = useUser();
  const editor = useEditor();

  // state
  const id: RemovableRef<string | number> = useStorage("visual-id", "");
  const titleField = useStorage("visual-title", "");
  const titles: RemovableRef<VisualTitleDTO[]> = useStorage("user-titles", []);
  const selectedTitle: Ref<VisualTitleDTO | undefined> = ref();
  const isUpToDate = ref(true);

  // computed
  const title = computed(() => titles.value.find((visual) => visual.id === +id.value)?.title ?? "");
  const _isNewTitle = computed(() => titleField.value && title.value !== titleField.value);
  const _isDuplicateTitle = computed(
    () => _isNewTitle.value && titles.value.map((visual) => visual.title).includes(titleField.value)
  );
  const isNewVisual = computed(() => !id.value);

  // actions
  async function createBlank() {
    id.value = "";
    titleField.value = "";
    editor.clear();
  }
  async function save(): Promise<void> {
    if (!user.id) throw Error("User not logged in.");
    if (_isDuplicateTitle.value) throw Error("Title already exists.");
    if (isNewVisual.value) {
      const response = await createVisual({
        title: titleField.value,
        user_id: user.id,
        start_year: user.startYear,
        elements: JSON.parse(JSON.stringify(courseFlow.toObject())),
      });
      if (response) {
        id.value = response.id;
        titles.value.push(response);
      }
    } else {
      const response = await updateVisual({
        id: +id.value!,
        title: title.value,
        user_id: user.id,
        start_year: user.startYear,
        elements: JSON.parse(JSON.stringify(courseFlow.toObject())),
      });
      if (response) {
        const index = titles.value.findIndex((visual) => visual.id === +id.value);
        titles.value[index] = { ...titles.value[index], title: titleField.value };
      }
    }
    setTimeout(() => (isUpToDate.value = true));
  }
  async function updateTitle() {
    if (isNewVisual.value) throw Error("Cannot update title of new visual.");
    if (_isDuplicateTitle.value) throw Error("Title already exists.");
    if (_isNewTitle.value) {
      const response = await updateVisual({ id: +id.value!, title: titleField.value });
      if (response) {
        const index = titles.value.findIndex((visual) => visual.id === +id.value);
        titles.value[index].title = titleField.value;
      }
    }
  }
  function revertTitle() {
    titleField.value = title.value;
  }
  async function load(): Promise<void> {
    if (!selectedTitle.value) throw Error("No visual selected.");
    const response = await readVisual(selectedTitle.value.id);
    if (response) {
      const elements = response.elements;
      id.value = response.id;
      titleField.value = response.title;
      editor.clear();
      setTimeout(() => courseFlow.load(elements));
      selectedTitle.value = undefined;
      setTimeout(() => (isUpToDate.value = true));
    }
  }
  async function loadTitles(userID: string): Promise<void> {
    const response = await readTitles(userID);
    if (response) titles.value = response;
  }
  async function remove(): Promise<void> {
    if (isNewVisual.value) throw Error("Cannot remove an unsaved visual.");
    const response = await deleteVisual(+id.value!);
    if (response) {
      titles.value = titles.value.filter((title) => title.id !== +id.value);
      createBlank();
    }
  }

  // watchers
  watchEffect(() => titles.value.sort((a, b) => a.title.localeCompare(b.title)));
  watch(
    [() => courseFlow.getEdges, () => courseFlow.getNodes],
    () => {
      if (isUpToDate.value) isUpToDate.value = false;
    },
    { deep: true }
  );

  return {
    id,
    titles,
    title,
    titleField,
    isUpToDate,
    selectedTitle,
    isNewVisual,
    createBlank,
    save,
    updateTitle,
    revertTitle,
    load,
    loadTitles,
    remove,
  };
});
