<script setup lang="ts">
import ManualNodeChips from "@/components/ManualNodeChips/ManualNodeChips.vue";
import { useEditor } from "@/stores/Editor.store";
const editor = useEditor();
if (!editor.degrees) editor.fillDegrees();
</script>
<template>
  <PrimeDivider class="m-0" />

  <h3 class="flex justify-content-center m-0">Add Course(s)</h3>
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
    <PrimeButton label="Add Course(s)" @click="editor.addCourseToFlow" />
  </div>

  <PrimeDivider />

  <PrimeDropdown
    v-model="editor.selectedDegree"
    :options="editor.degrees"
    optionLabel="title"
    placeholder="Select a Degree"
    class="keep-style flex align-content-center justify-items-center"
  />
  <div class="flex justify-content-center">
    <PrimeButton label="Add Degree" @click="editor.addDegreeToFlow" />
  </div>

  <PrimeDivider />

  <h3 class="flex justify-content-center m-0">Remove Course(s)</h3>

  <ManualNodeChips class="flex" />

  <div class="flex justify-content-center">
    <PrimeButton label="Remove All" @click="editor.clear" class="p-button-danger" />
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
