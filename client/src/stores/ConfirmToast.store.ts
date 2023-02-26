import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useToast } from "primevue/usetoast";

export const useConfirmToast = defineStore("ConfirmToast", () => {
  const toast = useToast();

  const _isOpen = ref(false);
  const _onReject = ref<() => void>();
  const _onConfirm = ref<() => void>();
  const isOpen = computed(() => _isOpen.value);

  const _severity = ref<"success" | "info" | "warn" | "error">("error");
  const severity = computed(() => _severity.value);

  function open(
    severity: "success" | "info" | "warn" | "error",
    summary: string,
    detail: string,
    onConfirm: () => void = () => {},
    onReject: () => void = () => {}
  ) {
    close();
    _severity.value = severity;
    _onConfirm.value = onConfirm;
    _onReject.value = onReject;
    toast.add({
      severity,
      summary,
      detail,
      group: "confirm",
      closable: false,
    });
    _isOpen.value = true;
  }
  function confirm() {
    _onConfirm.value?.();
    toast.removeGroup("confirm");
    _isOpen.value = false;
  }
  function reject() {
    _onReject.value?.();
    toast.removeGroup("confirm");
    _isOpen.value = false;
  }

  return { isOpen, severity, open, confirm, reject };
});
