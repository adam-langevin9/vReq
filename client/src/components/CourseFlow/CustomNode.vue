<script lang="ts" setup>
import { getIncomers, Handle, Position, VueFlow, type Elements, type HandleConnectable } from "@vue-flow/core";
import ListingSelect from "./ListingSelect.vue";
import NodeMenu from "./NodeMenu.vue";
import type { ICourseNodeData } from "@/classes/Node";
import { getOutgoers, useVueFlow } from "@vue-flow/core";
import { computed, watch } from "vue";
import { CustomEdge } from "@/classes/Edge";

const vueFlow = useVueFlow();

const props = defineProps<{
  id: string;
  data: ICourseNodeData;
  connectable: HandleConnectable | undefined;
}>();

const allElements = computed(() => {
  const allElements = [];
  allElements.push(...vueFlow.nodes.value);
  allElements.push(...vueFlow.edges.value);
  return allElements;
});

const visibleTargetIDs = computed(() => {
  return getOutgoers(vueFlow.findNode(props.id)!, allElements.value)
    .filter((outgoer) => !outgoer.hidden)
    .map((outgoer) => outgoer.id);
});

watch(
  visibleTargetIDs,
  () => {
    console.log(vueFlow.findNode(props.id)!);
    if (
      !vueFlow.findNode(props.id)!.data.manual &&
      (visibleTargetIDs.value.length === 0 ||
        visibleTargetIDs.value.some(
          (targetID) => !vueFlow.findEdge(CustomEdge.createEdgeID(props.id, targetID))?.hidden
        ))
    ) {
      vueFlow.findNode(props.id)!.hidden = true;
    }
    vueFlow.findNode(props.id)!.hidden = false;
  },
  { deep: true }
);
</script>

<template>
  <div class="outer node">
    <!-- {{ visibleTargetIDs.some((targetID) => vueFlow.findEdge(CustomEdge.createEdgeID(props.id, targetID))?.hidden) }}
    - {{ visibleTargetIDs.length === 0 }} -->
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
    <!-- {{ visibleTargetIDs }} -->
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
