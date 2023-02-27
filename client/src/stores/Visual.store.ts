import type { VisualTitleDTO } from "@/services/VisualDataService";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watchEffect, type Ref } from "vue";
import { useCourseFlow } from "./CourseFlow.store";
import { createVisual, readVisual, readTitles, updateVisual, deleteVisual } from "@/services/VisualDataService";
import { useUser } from "./User.store";
import { useStorage, type RemovableRef } from "@vueuse/core";
import { useEditor } from "./Editor.store";
import type { FlowExportObject } from "@vue-flow/core";
import { useToast } from "primevue/usetoast";

export const useVisual = defineStore("Visual", () => {
  // stores
  const courseFlow = useCourseFlow();
  const user = useUser();
  const { titles } = storeToRefs(user);
  const editor = useEditor();
  const toast = useToast();

  // computed used in state
  const title = computed(() => titles.value.find((visual) => visual.id === +id.value)?.title ?? "");

  // state
  const id: RemovableRef<number> = useStorage("visual-id", 0);
  const saveInput = ref({ title: title.value ?? "", valid: false, submitted: false });
  const isEditingTitle = ref(false);
  const loadInput: Ref<VisualTitleDTO> = ref({ id, title: "" });
  const loadInputValidation = ref({ valid: false, submitted: false });
  const loadedVisual: RemovableRef<string> = useStorage("loaded-visual", "");
  const startYear = useStorage("start-year", new Date().getFullYear());

  // validation
  const isInvalidSave = computed(() => saveInput.value.submitted && !saveInput.value.valid);
  function setSaveValid() {
    return !!saveInput.value.title && !_isDuplicateTitle.value;
  }
  const isInvalidLoad = computed(() => loadInputValidation.value.submitted && !loadInputValidation.value.valid);
  function setLoadValid() {
    return !!loadInput.value.id;
  }

  // submit handlers
  async function submitSave(action: () => Promise<void>) {
    saveInput.value.valid = setSaveValid();
    saveInput.value.submitted = true;
    if (!saveInput.value.valid) return;
    await action();
  }
  function submitLoad(action: () => void) {
    loadInputValidation.value.valid = setLoadValid();
    loadInputValidation.value.submitted = true;
    if (!loadInputValidation.value.valid) return;
    action();
  }

  // computed
  const _isNewTitle = computed(() => saveInput.value.title && title.value !== saveInput.value.title);
  const _isDuplicateTitle = computed(
    () => _isNewTitle.value && titles.value.map((visual) => visual.title).includes(saveInput.value.title)
  );
  const isNewVisual = computed(() => !id.value);
  const isUpToDate = computed(() => {
    if (courseFlow.toObject().nodes.length === 0) return true;
    else if (loadedVisual.value) {
      const flowExportObject = courseFlow.toObject();
      const curr = _prepareLoadForStorage(flowExportObject);
      const prev = JSON.stringify(JSON.parse(loadedVisual.value));
      return curr === prev;
    } else return false;
  });

  // toast actions
  function _showCreateSuccess() {
    toast.add({
      severity: "success",
      summary: "New Visual Created",
      life: 3000,
    });
  }
  function _showSaveSuccess() {
    toast.add({
      severity: "success",
      summary: `Visual Saved`,
      detail: title.value,
      life: 3000,
    });
  }
  function _showUpToDate() {
    toast.add({
      severity: "info",
      summary: `Visual up to date`,
      life: 3000,
    });
  }
  function _showSaveFail() {
    toast.add({
      severity: "error",
      summary: `Save Failed`,
      detail: `Your visual could not be saved at this time. Please try again later.`,
      life: 3000,
    });
  }
  function _showOpenSuccess() {
    toast.add({
      severity: "success",
      summary: `Opened Visual`,
      detail: title.value,
      life: 3000,
    });
  }
  function _showOpenFail() {
    toast.add({
      severity: "error",
      summary: `Open Failed`,
      detail: `The selected visual could not be opened at this time. Please try again later.`,
      life: 3000,
    });
  }
  function _showDeleteSuccess() {
    toast.add({
      severity: "success",
      summary: `Deleted Visual`,
      detail: title.value,
      life: 3000,
    });
  }
  function _showDeleteFail() {
    toast.add({
      severity: "error",
      summary: `Open Failed`,
      detail: `${title.value} could not be deleted at this time. Please try again later.`,
      life: 3000,
    });
  }

  // actions
  function createBlank(notify = true) {
    id.value = 0;
    saveInput.value.title = "";
    editor.clear(notify);
    if (notify) _showCreateSuccess();
  }
  function _prepareLoadForStorage(visual: FlowExportObject): string {
    const nodes = visual.nodes.map(({ id, data, position }) => ({ id, data, position }));
    nodes.sort();
    const edges = visual.edges.map(({ id, data }) => ({ id, data }));
    edges.sort();
    return JSON.stringify({ id: id.value, nodes, edges });
  }
  async function save(): Promise<void> {
    if (!user.id) throw Error("User not logged in.");
    if (_isDuplicateTitle.value) throw Error("Title already exists.");
    let response = null;
    if (isNewVisual.value) {
      response = await createVisual({
        title: saveInput.value.title,
        user_id: user.id,
        start_year: startYear.value,
        elements: JSON.parse(JSON.stringify(courseFlow.toObject())),
      });
      if (response) {
        id.value = response.id;
        titles.value.push({ id: response.id, title: response.title });
        loadedVisual.value = _prepareLoadForStorage(courseFlow.toObject());
        _showSaveSuccess();
      }
    } else {
      response = await updateVisual({
        id: +id.value!,
        title: title.value,
        user_id: user.id,
        start_year: startYear.value,
        elements: JSON.parse(JSON.stringify(courseFlow.toObject())),
      });
      if (response) {
        const index = titles.value.findIndex((visual) => visual.id === +id.value);
        titles.value[index] = { ...titles.value[index], title: saveInput.value.title };
        loadedVisual.value = _prepareLoadForStorage(courseFlow.toObject());
        _showSaveSuccess();
      } else if (response === 0) _showUpToDate();
      else _showSaveFail();
    }
  }
  async function updateTitle() {
    if (!user.id) throw Error("User not logged in.");
    if (isNewVisual.value) throw Error("Cannot update title of new visual.");
    if (_isDuplicateTitle.value) throw Error("Title already exists.");
    if (_isNewTitle.value) {
      const response = await updateVisual({ id: +id.value!, title: saveInput.value.title });
      if (response) {
        const index = titles.value.findIndex((visual) => visual.id === +id.value);
        titles.value[index].title = saveInput.value.title;
        isEditingTitle.value = false;
        _showSaveSuccess();
      } else _showSaveFail();
    }
  }
  function revertTitle() {
    saveInput.value.title = title.value;
  }
  async function load(): Promise<void> {
    if (!loadInput.value) throw Error("No visual selected.");
    const response = await readVisual(loadInput.value.id);
    if (response) {
      const elements = response.elements;
      id.value = response.id;
      saveInput.value.title = response.title;
      editor.clear(false);
      setTimeout(() => courseFlow.load(elements));
      loadInput.value = { title: "", id: 0 };
      setTimeout(() => (loadedVisual.value = _prepareLoadForStorage(courseFlow.toObject())));
      _showOpenSuccess();
    } else _showOpenFail();
  }
  async function loadTitles(userID: string): Promise<void> {
    const response = await readTitles(userID);
    if (response) titles.value = response;
  }
  async function remove(): Promise<void> {
    if (isNewVisual.value) throw Error("Cannot remove an unsaved visual.");
    const response = await deleteVisual(+id.value!);
    if (response) {
      _showDeleteSuccess();
      titles.value = titles.value.filter((title) => title.id !== +id.value);
      createBlank(false);
    } else _showDeleteFail();
  }

  return {
    id,
    titles,
    title,
    saveInput,
    isEditingTitle,
    isUpToDate,
    loadInput,
    isNewVisual,
    isInvalidSave,
    isInvalidLoad,
    setSaveValid,
    setLoadValid,
    submitSave,
    submitLoad,
    createBlank,
    save,
    updateTitle,
    revertTitle,
    load,
    loadTitles,
    remove,
  };
});
