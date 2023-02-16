<script setup lang="ts">
import ManualNodeChips from "@/components/ManualNodeChips/ManualNodeChips.vue";
import { useEditorMenu } from "@/stores/Menus/EditorMenu.store";
import { useCourseFlow } from "@/stores/CourseFlow.store";
const editorMenu = useEditorMenu();
editorMenu.fillDegrees();
const courseFlow = useCourseFlow();
</script>
<template>
  <PrimeDivider class="m-0" />

  <h3 class="flex justify-content-center m-0">Add Course(s)</h3>
  <div class="flex justify-content-center gap-2 pt-4">
    <div class="flex flex-grow-1">
      <span class="p-float-label">
        <PrimeInputMask
          class="w-full keep-style"
          id="subject"
          v-model="courseFlow.input.subj"
          mask="aaa?a"
          slotChar=""
          style="text-transform: uppercase"
        />
        <label for="subject">Course Subject</label>
      </span>
    </div>

    <div class="">
      <span class="p-float-label">
        <PrimeInputMask id="number" class="w-full keep-style" v-model="courseFlow.input.num" mask="999" slotChar="" />
        <label for="number">Course Number</label>
      </span>
    </div>

    <div class="">
      <PrimeButton
        @click="courseFlow.retrieveCourse"
        icon="pi pi-info-circle"
        iconPos="right"
        class="p-button-secondary"
      />
    </div>
  </div>

  <PrimeCard v-if="courseFlow.searchResult">
    <template #title> </template>
    <template #subtitle> {{ courseFlow.searchResult.title }}</template>
    <template #content>
      {{ courseFlow.searchResult.descr }}
    </template>
    <template #footer>
      <span v-if="courseFlow.searchResult.hours">Credit Hours:</span>
      {{ courseFlow.searchResult.hours }}
    </template>
  </PrimeCard>

  <div class="flex justify-content-center">
    <PrimeButton label="Add Course(s)" @click="courseFlow.addInputToFlow" />
  </div>

  <PrimeDivider />

  <PrimeDropdown
    v-model="editorMenu.selectedDegree"
    :options="editorMenu.degrees"
    optionLabel="title"
    placeholder="Select a Degree"
    class="keep-style flex align-content-center justify-items-center"
  />
  <div class="flex justify-content-center">
    <PrimeButton label="Add Degree" @click="courseFlow.addDegreeToFlow(editorMenu.selectedDegree.id)" />
  </div>

  <PrimeDivider />

  <h3 class="flex justify-content-center m-0">Remove Course(s)</h3>

  <ManualNodeChips class="flex" />

  <div class="flex justify-content-center">
    <PrimeButton label="Remove All" @click="courseFlow.clear" />
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
