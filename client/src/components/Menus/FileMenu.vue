<script setup lang="ts">
import ManualNodeChips from "@/components/ManualNodeChips/ManualNodeChips.vue";
import { useFileMenu } from "@/stores/Menus/FileMenu.store";
import { useCourseFlow } from "@/stores/CourseFlow.store";
import { ref } from "vue";
const fileMenu = useFileMenu();
const courseFlow = useCourseFlow();

const title = ref();
const editingTitle = ref(false);
const selectedVisual = ref();
</script>
<template>
  <PrimeDivider class="m-0" />

  <h3 class="flex justify-content-center m-0">Save Visual</h3>
  <form class="flex flex-column gap-5">
    <div class="flex justify-content-center">
      <div class="p-inputgroup">
        <span class="p-float-label">
          <PrimeInputText id="title" v-model="title" :disabled="!editingTitle" />
          <label for="title">Add Title</label>
        </span>
        <PrimeButton
          v-if="!editingTitle"
          @click="
            () => {
              editingTitle = true;
            }
          "
          icon="pi pi-pencil"
          iconPos="right"
          class="p-button-secondary p-button-outlined px-2"
        />
        <PrimeButton
          v-if="editingTitle"
          @click="
            () => {
              fileMenu.title = title;
              editingTitle = false;
            }
          "
          icon="pi pi-check"
          iconPos="right"
          class="p-button-primary p-button-outlined px-2"
        />
        <PrimeButton
          v-if="editingTitle"
          @click="
            () => {
              title = fileMenu.title;
              editingTitle = false;
            }
          "
          icon="pi pi-times"
          iconPos="right"
          class="p-button-danger p-button-outlined px-2"
        />
      </div>
    </div>

    <div class="flex justify-content-center">
      <PrimeButton icon="pi pi-save" label="Save" @click="courseFlow.addInputToFlow" :disabled="editingTitle" />
    </div>
  </form>

  <PrimeDivider />

  <h3 class="flex justify-content-center m-0">Open Visual</h3>
  <form class="flex flex-column gap-5">
    <PrimeDropdown
      v-model="selectedVisual"
      :options="fileMenu.visuals"
      optionLabel="title"
      placeholder="Select a Visual"
      class="keep-style flex align-content-center justify-items-center ml-4 mr-4"
    />
    <div class="flex justify-content-center">
      <PrimeButton icon="pi pi-folder-open" label="Open" @click="() => {}" />
    </div>

    <PrimeDivider />
  </form>
  <h3 class="flex justify-content-center m-0">Delete Visual</h3>

  <ManualNodeChips class="flex" />
  <div class="flex">
    <PrimeChip
      v-for="visual in fileMenu.visuals"
      :key="visual.id"
      :label="visual.title"
      :removable="true"
      class="align-items-center justify-content-center m-1"
    />
  </div>
</template>
<style scoped></style>
