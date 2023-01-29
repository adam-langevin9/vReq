<script lang="ts" setup>
import { VueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { nodeTypes } from "./Nodes/NodeTypes";
import { getIncomers, useVueFlow } from "@vue-flow/core";

const viewMinHeight = "30rem";
const viewMaxWidth = "80%";
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
  <PrimeButton label="Flow Data" @click="printFlowData" style="position: fixed; top: 20px; left: 20px" />
  <div class="flex justify-content-center m-2">
    <VueFlow class="visual" :node-types="nodeTypes" :default-zoom="1.5" :min-zoom="0.2" :max-zoom="4">
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

.visual:deep(.node) {
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
</style>
