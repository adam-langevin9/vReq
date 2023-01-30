<script lang="ts" setup>
import { getOutgoers, VueFlow, type GraphEdge, type GraphNode } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { nodeTypes } from "@/classes/Node";
import { getIncomers, useVueFlow } from "@vue-flow/core";
import { computed } from "vue";

const viewMinHeight = "30rem";
const viewMaxWidth = "80%";
const vueFlow = useVueFlow();

function printFlowData() {
  console.log("==========");
  console.log("Flow Data");
  console.log("----------");
  console.log(vueFlow.toObject());
  console.log("==========");
  const self = vueFlow.findNode("242")!;
  const allOutgoers = computed(() => {
    const allElements = [];
    allElements.push(...vueFlow.nodes.value);
    allElements.push(...vueFlow.edges.value);
    return getOutgoers(self, allElements);
  });
  console.log(allOutgoers.value.some((outgoer) => !outgoer.hidden));
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
</style>
