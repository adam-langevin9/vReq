<script setup lang="ts">
import { useVisual } from "@/stores/Visual.store";
import { computed, ref } from "vue";
import { useConfirmToast } from "@/stores/ConfirmToast.store";
import { storeToRefs } from "pinia";
import UserMenu from "./UserMenu.vue";
import { useUser } from "@/stores/User.store";

// stores
const visual = useVisual();
const { saveInput, loadInput } = storeToRefs(visual);
const confirmToast = useConfirmToast();
const user = useUser();

// state
const shouldDisableButtons = computed(() => visual.isEditingTitle && !visual.isNewVisual);

// toast actions
const showConfirmCreate = () => {
  if (visual.isUpToDate) visual.createBlank();
  else
    confirmToast.open(
      "warn",
      `Are you sure you want to create a blank visual?`,
      "You have unsaved changes that will be lost",
      visual.createBlank
    );
};
const showConfirmOpen = () => {
  if (visual.isUpToDate) visual.load();
  else
    confirmToast.open(
      "warn",
      `Are you sure you want to open '${loadInput.value.title}'?`,
      "You have unsaved changes that will be lost",
      visual.load
    );
};
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
  <PrimeDivider v-if="user.id" class="m-0 mb-2" />
  <div v-if="user.id" class="flex flex-column gap-5">
    <div class="flex justify-content-center">
      <PrimeButton
        icon="pi pi-plus"
        label="New Visual"
        @click="showConfirmCreate"
        class="p-button-primary p-button-outlined"
        :disabled="shouldDisableButtons"
      />
    </div>

    <PrimeDivider class="m-0" />

    <h3 class="flex justify-content-center m-0">Save Visual</h3>
    <form class="flex flex-column gap-5">
      <div>
        <div class="flex justify-content-center">
          <div class="p-inputgroup">
            <span class="p-float-label">
              <PrimeInputText
                id="title"
                v-model="saveInput.title"
                :disabled="!visual.isEditingTitle && !visual.isNewVisual"
                :class="{ 'p-invalid': visual.isInvalidSave }"
              />
              <label for="title">Add Title</label>
            </span>
            <PrimeButton
              v-if="!visual.isEditingTitle && visual.id"
              @click="
                () => {
                  visual.isEditingTitle = true;
                }
              "
              icon="pi pi-pencil"
              iconPos="right"
              class="p-button-secondary p-button-outlined px-2"
            />
            <PrimeButton
              v-if="visual.isEditingTitle && visual.id"
              @click="
                () => {
                  visual.submitSave(visual.updateTitle);
                }
              "
              icon="pi pi-check"
              iconPos="right"
              class="p-button-primary p-button-outlined px-2"
            />
            <PrimeButton
              v-if="visual.isEditingTitle && visual.id"
              @click="
                () => {
                  visual.revertTitle();
                  visual.isEditingTitle = false;
                }
              "
              icon="pi pi-times"
              iconPos="right"
              class="p-button-danger p-button-outlined px-2"
            />
          </div>
        </div>
        <small v-if="visual.isInvalidSave" class="p-error">Invalid Title</small>
      </div>

      <div class="flex justify-content-center">
        <PrimeButton
          @click="visual.submitSave(visual.save)"
          :disabled="shouldDisableButtons"
          class="p-button-outlined p-button-secondary"
        >
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
      <div>
        <PrimeDropdown
          v-model="loadInput"
          :options="visual.titles"
          optionLabel="title"
          placeholder="Select a Visual"
          :disabled="shouldDisableButtons"
          :class="{
            'keep-style flex align-content-center justify-items-center': true,
            'p-invalid': visual.isInvalidLoad,
          }"
        />
        <small v-if="visual.isInvalidLoad" class="p-error">Pick a Visual</small>
      </div>
      <div class="flex justify-content-center">
        <PrimeButton
          icon="pi pi-folder-open"
          label="Open"
          @click="
            () => {
              visual.submitLoad(showConfirmOpen);
            }
          "
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
  </div>

  <UserMenu v-else />
</template>
<style scoped>
:deep(.p-button .p-badge) {
  min-width: 1rem !important;
  height: 1rem !important;
  right: -0.85rem;
  top: -0.35rem;
}
</style>
