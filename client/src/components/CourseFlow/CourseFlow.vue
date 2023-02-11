<script lang="ts" setup>
import { VueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { useCourseFlow } from "@/stores/CourseFlowStore";
import CourseChips from "@/components/CourseFlow/CourseChips/CourseChips.vue";

const minHeight = "30rem";
const maxWidth = "80%";
const courseFlow = useCourseFlow();

function printFlowData() {
  console.log("==========");
  console.log("Flow Data");
  console.log("----------");
  console.log(courseFlow.vueFlow.toObject());
  console.log("==========");
}
</script>

<template>
  <!-- <PrimeButton label="Flow Data" @click="printFlowData" style="position: fixed; top: 20px; left: 20px" /> -->

  <CourseChips />

  <div class="flex justify-content-center m-2">
    <VueFlow
      id="course-flow"
      class="visual"
      :node-types="courseFlow.nodeTypes"
      :edge-types="courseFlow.edgeTypes"
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
  max-width: v-bind(maxWidth);
  min-height: v-bind(minHeight);
}
.background {
  min-height: v-bind(minHeight);
}
</style>
