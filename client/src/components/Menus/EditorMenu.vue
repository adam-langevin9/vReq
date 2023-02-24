<script setup lang="ts">
import ManualNodeChips from "@/components/ManualNodeChips/ManualNodeChips.vue";
import { useConfirmToast } from "@/stores/ConfirmToast.store";
import { useEditor } from "@/stores/Editor.store";
const editor = useEditor();
const confirmToast = useConfirmToast();
if (!editor.degrees) editor.fillDegrees();
const showConfirmRemoveAll = () => {
  confirmToast.open(
    "error",
    `Are you sure you want to remove all courses?`,
    "This action can not be undone",
    editor.clear
  );
};
</script>
<template>
  <PrimeDivider class="m-0" />
  <div class="m-0">
    <div>
      <h3 class="m-0 text-center">Add Course</h3>
    </div>
    <p class="m-1 text-center text-xs">Adding a course will add the course and its requirements to the visual.</p>
  </div>
  <div class="p-inputgroup">
    <span class="p-float-label">
      <PrimeInputMask
        class="w-full keep-style"
        id="subject"
        v-model="editor.courseInput.subj"
        mask="aaa?a"
        slotChar=""
        style="text-transform: uppercase"
      />
      <label for="subject">Course Subject</label>
    </span>

    <span class="p-float-label">
      <PrimeInputMask id="number" v-model="editor.courseInput.num" mask="999" slotChar="" />
      <label for="number">Course Number</label>
    </span>

    <PrimeButton @click="editor.retrieveCourse" icon="pi pi-info-circle" class="p-button-secondary pl-4 pr-4" />
  </div>

  <PrimeCard v-if="editor.searchResult">
    <template #title> </template>
    <template #subtitle> {{ editor.searchResult.title }}</template>
    <template #content>
      {{ editor.searchResult.descr }}
    </template>
    <template #footer>
      <span v-if="editor.searchResult.hours">Credit Hours:</span>
      {{ editor.searchResult.hours }}
    </template>
  </PrimeCard>

  <div class="flex justify-content-center">
    <PrimeButton label="Add Course" @click="editor.addCourseToFlow" class="p-button-outlined" />
  </div>

  <PrimeDivider />
  <div class="m-0">
    <div>
      <h3 class="m-0 text-center">Add Degree</h3>
    </div>
    <p class="m-1 text-center text-xs">
      Adding a degree will add the degree's required courses along with their requirements.
    </p>
  </div>
  <PrimeDropdown
    v-model="editor.selectedDegree"
    :options="editor.degrees"
    optionLabel="title"
    placeholder="Select a Degree"
    class="keep-style flex align-content-center justify-items-center"
  />
  <div class="flex justify-content-center">
    <PrimeButton label="Add Degree" @click="editor.addDegreeToFlow" class="p-button-outlined" />
  </div>

  <PrimeDivider />

  <div class="m-0">
    <div>
      <h3 class="m-0 text-center">Remove Course(s)</h3>
    </div>
    <p class="m-0 mt-1 text-center text-xs">
      When you remove a course that you added, all of it requirements will also be removed.
    </p>
  </div>

  <ManualNodeChips class="flex" />

  <div class="flex justify-content-center">
    <PrimeButton
      label="Remove All"
      @click="showConfirmRemoveAll"
      class="p-button-danger p-button-rounded p-button-outlined"
    />
  </div>
</template>
<style scoped>
:deep(.p-card-content) {
  font-size: small;
}
:deep(.p-card-footer) {
  font-size: small;
}
</style>
