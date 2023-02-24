<script setup lang="ts">
import { useVisual } from "@/stores/Visual.store";
import { computed, ref } from "vue";
import { useConfirmToast } from "@/stores/ConfirmToast.store";

const visual = useVisual();
const confirmToast = useConfirmToast();

const isEditingTitle = ref(false);
const shouldDisableButtons = computed(() => isEditingTitle.value && !visual.isNewVisual);

const showConfirmDelete = () => {
  confirmToast.open(
    "error",
    `Are you sure you want to delete '${visual.title}'?`,
    "This action can not be undone",
    visual.remove
  );
};
</script>
<template>
  <div class="flex justify-content-center">
    <PrimeButton
      icon="pi pi-plus"
      label="New Visual"
      @click="visual.createBlank"
      class="p-button-primary p-button-outlined"
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
      <PrimeButton @click="visual.save" :disabled="shouldDisableButtons" class="p-button-outlined p-button-secondary">
        <div class="p-overlay-badge">
          <i class="pi pi-save mr-2" />
          <span>Save</span>
          <PrimeBadge v-if="!visual.isUpToDate" severity="warning"></PrimeBadge>
        </div>
      </PrimeButton>
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
      <PrimeButton
        icon="pi pi-folder-open"
        label="Open"
        @click="visual.load"
        :disabled="shouldDisableButtons"
        class="p-button-outlined p-button-secondary"
      />
    </div>
  </form>

  <PrimeDivider v-if="visual.title" />

  <div v-if="visual.title" class="flex justify-content-center">
    <PrimeButton
      icon="pi pi-trash"
      label="Delete Visual"
      @click="showConfirmDelete"
      class="p-button-danger p-button-outlined"
      :disabled="shouldDisableButtons"
    />
  </div>
</template>
<style scoped>
:deep(.p-button .p-badge) {
  min-width: 0.5rem !important;
  height: 0.5rem !important;
  right: -0.5rem;
}
</style>
