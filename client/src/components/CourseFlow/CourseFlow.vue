<script lang="ts" setup>
import {
  VueFlow,
  type EdgeComponent,
  type EdgeTypesObject,
  type NodeComponent,
  type NodeTypesObject,
} from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { CustomNode } from "@/classes/Node";
import { useVueFlow } from "@vue-flow/core";
import { markRaw } from "vue";
import { useCourseFlow } from "@/stores/CoursFlowStore";
import CourseEdge from "./CourseEdge.vue";
import CourseNode from "./CourseNode.vue";
import { CustomEdge } from "@/classes/Edge";

const nodeTypes: NodeTypesObject = {
  course: markRaw(CourseNode) as NodeComponent,
};
const edgeTypes: EdgeTypesObject = {
  course: markRaw(CourseEdge) as EdgeComponent,
};

const courseFlow = useCourseFlow();

const viewMinHeight = "30rem";
const viewMaxWidth = "80%";
const vueFlow = useVueFlow();

function printFlowData() {
  console.log("==========");
  console.log("Flow Data");
  console.log("----------");
  console.log(vueFlow.toObject());
  console.log("==========");
  console.log(courseFlow.allNodesVisibility);
}
</script>

<template>
  <PrimeButton
    label="Toggle Visibility"
    @click="
      () => {
        courseFlow.allNodesVisibility = !courseFlow.allNodesVisibility;
      }
    "
    style="position: fixed; top: 120px; left: 20px"
  />
  <PrimeButton label="Flow Data" @click="printFlowData" style="position: fixed; top: 20px; left: 20px" />
  <div class="flex justify-content-center m-2">
    <VueFlow
      class="visual"
      :node-types="nodeTypes"
      :edge-types="edgeTypes"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"
    >
      <Background class="background" />
      <MiniMap />
      <Controls />
    </VueFlow>
  </div>
</template>

<style scoped>
.visual {
  min-height: v-bind(viewMinHeight);
  max-width: v-bind(viewMaxWidth);
}
.background {
  min-height: v-bind(viewMinHeight);
}
</style>
