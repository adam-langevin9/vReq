<script setup lang="ts">
import { Position } from "@vue-flow/core";
import { ref, watch } from "vue";
const props = defineProps<{
  title: string;
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);
const visible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    visible.value = value;
  }
);
watch(visible, (value) => {
  emit("update:modelValue", value);
});
</script>

<template>
  <PrimeSidebar
    v-model:visible="visible"
    :position="Position.Left"
    :modal="false"
    :dismissable="false"
    class="p-sidebar-third"
  >
    <template #header>
      <h2 class="flex align-items-center justify-content-center flex-grow-1 m-0">{{ title }}</h2>
    </template>
    <div class="flex justify-content-center flex-column gap-4 ml-4 mr-4">
      <slot></slot>
    </div>
  </PrimeSidebar>
</template>

<style>
.p-sidebar-header {
  justify-content: space-between !important;
}
.p-sidebar-header-content {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  flex-grow: 1 !important;
}
.p-sidebar-left .p-sidebar-third {
  width: 30rem !important;
}
</style>
