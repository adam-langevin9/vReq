<script lang="ts" setup>
import { Handle, Position, type HandleConnectable } from "@vue-flow/core";
import ListingSelect from "../NodeComponents/ListingSelect.vue";
import NodeMenu from "../NodeComponents/NodeMenu.vue";
import type { DetailedCourseAttributes } from "@/classes/DetailedCourse";
defineProps<{
  data: {
    type: DetailedCourseAttributes;
    required: true;
  };
  connectable: HandleConnectable | undefined;
}>();
</script>

<template>
  <div class="node">
    <div class="flex justify-content-between">
      <NodeMenu />
      <ListingSelect :detailedCourse="data" class="listing flex align-items-center justify-content-center" />
      <PrimeButton
        icon="pi pi-search"
        class="p-button-secondary p-button-text flex align-items-center justify-content-center p-button-sm"
      />
    </div>
    <Handle id="target" type="target" :position="Position.Left" :connectable="connectable" />
    <Handle id="source" type="source" :position="Position.Right" :connectable="connectable" />
  </div>
</template>

<style scoped></style>
