<script setup lang="ts">
import { getSelectedName } from "@/classes/CustomNode";
import { useCourseFlow } from "@/stores/CourseFlow.store";
import ManualNodeChip from "./ManualNodeChip.vue";

// stores
const courseFlow = useCourseFlow();
</script>
<template>
  <div class="flex flex-row flex-wrap m-2 align-items-center justify-content-center">
    <div class="flex flex-row flex-wrap m-2 chips align-items-center justify-content-center">
      <ManualNodeChip
        v-for="node in courseFlow.getManualNodes.sort((a, b) => getSelectedName(a).localeCompare(getSelectedName(b)))"
        :node="node"
        :key="node.id"
        class="flex align-items-center justify-content-center m-1"
      />
    </div>
  </div>
</template>
<style scoped></style>
