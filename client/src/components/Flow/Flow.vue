<script lang="ts" setup>
import { VueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { useCourseFlow } from "@/stores/CourseFlow.store";

const courseFlow = useCourseFlow();

function printFlowData() {
  console.log("==========");
  console.log("Flow Data");
  console.log("----------");
  console.log(courseFlow.toObject());
  console.log("==========");
}
</script>

<template>
  <!-- <PrimeButton label="Flow Data" @click="printFlowData" style="position: fixed; top: 100px; left: 20px" /> -->

  <div class="flow-container flex justify-content-center flex-column">
    <VueFlow
      id="course-flow"
      class="visual flex justify-content-center align-items-center align-self-stretch flex-grow-1"
      :node-types="courseFlow.nodeTypes"
      :edge-types="courseFlow.edgeTypes"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"
    >
      <PrimeSpinner v-if="courseFlow.isLoadingFlow" style="z-index: 10" />
      <div class="">
        <Background class="background" />
        <MiniMap />
        <Controls :showInteractive="false" :fitViewParams="{ duration: 200 }" />
      </div>
    </VueFlow>
  </div>
</template>

<style scoped>
.flow-container {
  min-height: 100vh;
  padding: 4vh 5vw 4vh 9vw;
}
.visual {
  width: 100%;
  height: 100%;
}
.background {
  height: 100%;
}
</style>
