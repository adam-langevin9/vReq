<script lang="ts" setup>
import { VueFlow, Position, MarkerType, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { Listing } from "../../classes/Listing";
import { onMounted } from "vue";
import { nodeTypes } from "./Nodes/NodeTypes/NodeTypes";
import { SingleReqNode } from "./Nodes/SingleReqNode";
import { CoreqNode } from "./Nodes/CoreqNode";
import { ParentNode } from "./Nodes/ParentNode";
import { HardEdge } from "./Edges/HardEdge";
import { SoftEdge } from "./Edges/SoftEdge";

const viewMinHeight = "30rem";
const viewMaxWidth = "80%";
const { onConnect, nodes, edges, addEdges, addNodes } = useVueFlow({
  fitViewOnInit: true,
  nodes: [
    new SingleReqNode("CSC 131", { x: 0, y: 0 }, new Listing(["CSC 131"])),
    new SingleReqNode("CSC 231", { x: 250, y: 0 }, new Listing(["CSC 231"])),
    new SingleReqNode("CSC 220", { x: 250, y: 50 }, new Listing(["ART 220", "CSC 220", "FST 220"], "CSC 220")),
    new SingleReqNode("CSC 133", { x: 0, y: 50 }, new Listing(["CSC 133", "CIT 133", "MIS 133"], "CSC 133")),
    new ParentNode("123", { x: -5, y: 100 }),
    new CoreqNode("BIO 201", "123", { x: 5, y: 5 }, new Listing(["BIO 201"])),
    new CoreqNode("BIOL 201", "123", { x: 5, y: 55 }, new Listing(["BIOL 201", "TEST 201"])),
  ],
  edges: [new HardEdge("CSC 131", "CSC 231"), new HardEdge("CSC 133", "CSC 231"), new SoftEdge("CSC 131", "CSC 220")],
});

onConnect((params) => addEdges([params]));

onMounted(() => {
  // add nodes
  addNodes([]);
});
</script>

<template>
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

.visual >>> .node {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1rem;
  color: #495057;
  border-radius: 3px;
  width: 175px;
  height: 45px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  background: #fff;
  white-space: nowrap;
}
</style>
