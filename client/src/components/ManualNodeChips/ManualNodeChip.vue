<script setup lang="ts">
import type { CustomNodeData } from "@/classes/CustomNode";
import { getSelectedName } from "@/classes/CustomNode";
import { useConfirmToast } from "@/stores/ConfirmToast.store";
import type { GraphNode } from "@vue-flow/core";
import { useToast } from "primevue/usetoast";
import { computed } from "vue";

// stores
const props = defineProps<{ node: GraphNode<CustomNodeData, any> }>();
const confirmToast = useConfirmToast();
const toast = useToast();

// computed
const selectedListings = computed(() => getSelectedName(props.node));

// toast actions
const showConfirmRemoveNode = () => {
  confirmToast.open(
    "error",
    `Are you sure you want to remove ${selectedListings.value}?`,
    "This action can not be undone",
    removeNode
  );
};
function _showRemoveCourseSuccess() {
  toast.add({
    severity: "success",
    summary: "Course Removed",
    detail: selectedListings.value,
    life: 3000,
  });
}

// actions
const removeNode = () => {
  props.node.data.manual = false;
  _showRemoveCourseSuccess();
};
</script>
<template>
  <div
    class="p-chip p-component flex align-items-center justify-content-center m-1"
    aria-label="{{ selectedListings }}"
  >
    <div class="p-chip-text">{{ selectedListings }}</div>
    <span
      tabindex="0"
      class="p-chip-remove-icon pi pi-times-circle"
      @click="showConfirmRemoveNode"
      style="cursor: pointer"
    ></span>
  </div>
</template>
<style scoped></style>
