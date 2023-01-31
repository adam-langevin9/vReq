<script lang="ts" setup>
import {
  getIncomers,
  Handle,
  Position,
  VueFlow,
  type Elements,
  type GraphEdge,
  type HandleConnectable,
} from "@vue-flow/core";
import ListingSelect from "./ListingSelect.vue";
import NodeMenu from "./NodeMenu.vue";
import type { ICourseNodeData } from "@/classes/Node";
import { getOutgoers, useVueFlow } from "@vue-flow/core";
import { computed, watch } from "vue";
import { CustomEdge } from "@/classes/Edge";
import { useCourseFlow } from "@/stores/CoursFlowStore";

const vueFlow = useVueFlow();
const courseFlow = useCourseFlow();

const props = defineProps<{
  id: string;
  data: ICourseNodeData;
  connectable: HandleConnectable | undefined;
}>();

const self = vueFlow.nodes.value.find((node) => node.id === props.id)!;

const allElements = computed(() => {
  const elms = [];
  elms.push(...vueFlow.nodes.value);
  elms.push(...vueFlow.edges.value);
  return elms as Elements;
});

const hidden = computed(() => self.hidden);
const allInNodes = computed(() => getIncomers(self, allElements.value));
const outGoers = computed(() => getOutgoers(self, vueFlow.getElements.value));

// watch(hidden, () => {
//   if (hidden && !self.data.manual && outGoers.value.length === 0) {
//     self.hidden = true;
//     allInNodes.value.forEach((node) => {
//       node.hidden = true;
//     });
//   } else {
//     self.hidden = false;
//     allInNodes.value.forEach((node) => {
//       node.hidden = false;
//     });
//   }
// });

watch(
  () => courseFlow.allNodesVisibility,
  () => {
    self.hidden = courseFlow.allNodesVisibility;
    console.log(self.data.courses[0].listings[0]);
  }
);
</script>

<template>
  <div class="outer node">
    {{ !self.data.manual && outGoers.length === 0 }}
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
  {{ props.id }}
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
