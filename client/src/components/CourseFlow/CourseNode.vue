<script setup lang="ts">
import { Handle, Position, type HandleConnectable, useNode } from "@vue-flow/core";
import ListingSelect from "./ListingSelect.vue";
import NodeMenu from "./NodeMenu.vue";
import type { ICustomNodeData } from "@/classes/Node";
import { computed, watchEffect } from "vue";

const props = defineProps<{
  id: string;
  data: ICustomNodeData;
  connectable: HandleConnectable | undefined;
}>();

const self = useNode();
const shouldHideNode = computed(
  () =>
    !self.node.data.manual &&
    self.connectedEdges.value.filter((edge) => edge.source === props.id).every((edge) => edge.data.hidden)
);
watchEffect(() => {
  if (shouldHideNode.value) {
    props.data.hidden = true;
    self.node.style = { pointerEvents: "none" };
  } else {
    props.data.hidden = false;
    self.node.style = { pointerEvents: "all" };
  }
});
</script>

<template>
  <div v-if="!props.data.hidden" class="node">
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

<style>
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

.hide {
  display: "none" !important;
  pointer-events: "none" !important;
}
</style>
