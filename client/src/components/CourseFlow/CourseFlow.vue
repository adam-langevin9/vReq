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
import { useVueFlow } from "@vue-flow/core";
import { markRaw } from "vue";
import { useCourseFlow } from "@/stores/CoursFlowStore";
import CourseEdge from "./CourseEdge.vue";
import CourseNode from "./CourseNode.vue";

const nodeTypes: NodeTypesObject = {
  course: markRaw(CourseNode) as NodeComponent,
};
const edgeTypes: EdgeTypesObject = {
  course: markRaw(CourseEdge) as EdgeComponent,
};

const courseFlow = useCourseFlow();

const minHeight = "30rem";
const maxHeight = "95%";
const maxWidth = "80%";
const vueFlow = useVueFlow();

function printFlowData() {
  console.log("==========");
  console.log("Flow Data");
  console.log("----------");
  console.log(vueFlow.toObject());
  console.log("==========");
}
</script>

<template>
  <!-- <PrimeButton label="Flow Data" @click="printFlowData" style="position: fixed; top: 20px; left: 20px" /> -->
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
      <Controls :showInteractive="false" :fitViewParams="{ duration: 200 }" />
    </VueFlow>
  </div>
</template>

<style scoped>
.visual {
  min-height: v-bind(minHeight);
  max-height: v-bind(maxHeight);
  max-width: v-bind(maxWidth);
  height: auto;
  overflow-y: auto;
}
.background {
  min-height: v-bind(minHeight);
}
</style>
