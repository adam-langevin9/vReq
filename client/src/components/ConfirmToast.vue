<script setup lang="ts">
import { useFocus } from "@vueuse/core";
import { computed, ref } from "vue";
import { useConfirmToast } from "@/stores/ConfirmToast.store";

const confirmButton = ref();
useFocus(confirmButton, { initialValue: true });

const confirmToast = useConfirmToast();
withDefaults(
  defineProps<{
    icon?: string;
    position?: string;
    group?: string;
    onReject?: () => void;
    onConfirm?: () => void;
  }>(),
  {
    icon: "pi pi-exclamation-triangle",
    position: "top-center",
    group: "confirm",
    onReject: () => {},
    onConfirm: () => {},
  }
);
const confirmClass = computed(() =>
  confirmToast.severity === "error"
    ? "p-button-danger"
    : confirmToast.severity === "warn"
    ? "p-button-warning"
    : confirmToast.severity === "info"
    ? "p-button-info"
    : confirmToast.severity === "success"
    ? "p-button-success"
    : "p-button-secondary"
);
const reject = () => {
  confirmToast.reject();
};
const confirm = () => {
  confirmToast.confirm();
};
</script>
<template>
  <PrimeToast :position="position" :group="group" style="z-index: 1105">
    <template #message="slotProps" class="center">
      <div class="flex flex-column flex-grow-1">
        <div class="text-center">
          <i :class="icon" style="font-size: 3rem"></i>
          <div class="m-3">
            <h4 class="m-0">{{ slotProps.message.summary }}</h4>
            <p class="m-1 text-xs">{{ slotProps.message.detail }}</p>
          </div>
        </div>
        <div class="grid p-fluid">
          <div class="col-6">
            <PrimeButton class="p-button-secondary" label="No" @click="reject"></PrimeButton>
          </div>
          <div class="col-6">
            <PrimeButton ref="confirmButton" :class="confirmClass" label="Yes" @click="confirm"></PrimeButton>
          </div>
        </div>
      </div>
    </template>
  </PrimeToast>
</template>
<style>
.p-toast-message-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
