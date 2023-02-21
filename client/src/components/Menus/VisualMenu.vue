<script setup lang="ts">
import { useVisual } from "@/stores/Visual.store";
import { computed, ref } from "vue";
const visual = useVisual();
const isEditingTitle = ref(false);
const shouldDisableButtons = computed(() => isEditingTitle.value && !visual.isNewVisual);
</script>
<template>
  <div class="flex justify-content-center">
    <PrimeButton
      icon="pi pi-plus"
      label="New Visual"
      @click="visual.createBlank"
      class="p-button-secondary"
      :disabled="shouldDisableButtons"
    />
  </div>

  <PrimeDivider class="m-0" />

  <h3 class="flex justify-content-center m-0">Save Visual</h3>
  <form class="flex flex-column gap-5">
    <div class="flex justify-content-center">
      <div class="p-inputgroup">
        <span class="p-float-label">
          <PrimeInputText id="title" v-model="visual.titleField" :disabled="!isEditingTitle && !visual.isNewVisual" />
          <label for="title">Add Title</label>
        </span>
        <PrimeButton
          v-if="!isEditingTitle && visual.id"
          @click="
            () => {
              isEditingTitle = true;
            }
          "
          icon="pi pi-pencil"
          iconPos="right"
          class="p-button-secondary p-button-outlined px-2"
        />
        <PrimeButton
          v-if="isEditingTitle && visual.id"
          @click="
            () => {
              visual.updateTitle();
              isEditingTitle = false;
            }
          "
          icon="pi pi-check"
          iconPos="right"
          class="p-button-primary p-button-outlined px-2"
        />
        <PrimeButton
          v-if="isEditingTitle && visual.id"
          @click="
            () => {
              visual.revertTitle();
              isEditingTitle = false;
            }
          "
          icon="pi pi-times"
          iconPos="right"
          class="p-button-danger p-button-outlined px-2"
        />
      </div>
    </div>

    <div class="flex justify-content-center">
      <PrimeButton icon="pi pi-save" label="Save" @click="visual.save" :disabled="shouldDisableButtons" />
    </div>
  </form>

  <PrimeDivider />

  <h3 class="flex justify-content-center m-0">Open Visual</h3>
  <form class="flex flex-column gap-5">
    <PrimeDropdown
      v-model="visual.selectedTitle"
      :options="visual.titles"
      optionLabel="title"
      placeholder="Select a Visual"
      class="keep-style flex align-content-center justify-items-center ml-4 mr-4"
      :disabled="shouldDisableButtons"
    />
    <div class="flex justify-content-center">
      <PrimeButton icon="pi pi-folder-open" label="Open" @click="visual.load" :disabled="shouldDisableButtons" />
    </div>
  </form>

  <PrimeDivider />

  <div class="flex justify-content-center">
    <PrimeButton
      icon="pi pi-trash"
      label="Delete Visual"
      @click="visual.remove"
      class="p-button-danger"
      :disabled="shouldDisableButtons || visual.isNewVisual"
    />
  </div>
</template>
<style scoped></style>
