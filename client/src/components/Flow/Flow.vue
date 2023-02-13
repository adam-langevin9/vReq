<script lang="ts" setup>
import { VueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { useFlow } from "@/stores/FlowStore";
import ManualNodeChips from "@/components/ManualNodeChips/ManualNodeChips.vue";

const minHeight = "30rem";
const maxWidth = "80%";
const flow = useFlow();

function printFlowData() {
  console.log("==========");
  console.log("Flow Data");
  console.log("----------");
  console.log(flow.toObject());
  console.log("==========");
}
</script>

<template>
  <PrimeButton label="Flow Data" @click="printFlowData" style="position: fixed; top: 100px; left: 20px" />

  <ManualNodeChips />

  <div class="flex justify-content-center m-2 mb-8">
    <VueFlow
      id="course-flow"
      class="visual flex justify-content-center align-items-center"
      :node-types="flow.nodeTypes"
      :edge-types="flow.edgeTypes"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"
    >
      <PrimeSpinner v-if="flow.isLoadingFlow" style="z-index: 10" />
      <div class="">
        <Background class="background" />
        <MiniMap />
        <Controls :showInteractive="false" :fitViewParams="{ duration: 200 }" />
      </div>
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
