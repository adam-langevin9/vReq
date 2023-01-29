<script lang="ts" setup>
import { Handle, Position, type HandleConnectable } from "@vue-flow/core";
import ListingSelect from "./ListingSelect.vue";
import NodeMenu from "./NodeMenu.vue";
import type { ICourseNodeData } from "@/classes/Node";
defineProps<{
  data: {
    [x: string]: any;
    type: ICourseNodeData;
    required: true;
  };
  connectable: HandleConnectable | undefined;
}>();
</script>

<template>
  <div class="outer node">
    <div
      :class="data.courses.length > 1 ? 'inner node flex justify-content-between' : 'flex justify-content-between'"
      v-for="course in data.courses"
    >
      <NodeMenu :group="data.courses.length > 1 ? true : false" />
      <ListingSelect :detailedCourse="course" class="listing flex align-items-center justify-content-center" />
      <PrimeButton
        icon="pi pi-search"
        class="p-button-secondary p-button-text flex align-items-center justify-content-center p-button-sm"
      />
    </div>
    <Handle id="target" type="target" :position="Position.Left" :connectable="connectable" />
    <Handle id="source" type="source" :position="Position.Right" :connectable="connectable" />
  </div>
</template>

<style scoped>
.node {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1rem;
  color: #495057;
  border-radius: 3px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  background: #fff;
  white-space: nowrap;
}

.inner.node {
  width: 175px;
  height: 45px;
  margin: 4px;
}
</style>
