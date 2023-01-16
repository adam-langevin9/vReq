<script setup lang="ts">
import { Listing } from "@/classes/Listing";
import { HardEdge } from "@/components/CourseVisual/Edges/HardEdge";
import { SoftEdge } from "@/components/CourseVisual/Edges/SoftEdge";
import { ChildNode } from "@/components/CourseVisual/Nodes/ChildNode";
import { SingleNode } from "@/components/CourseVisual/Nodes/SingleNode";
import { ParentNode } from "@/components/CourseVisual/Nodes/ParentNode";
import { useVueFlow } from "@vue-flow/core";
import CourseSearch from "../components/CourseSearch.vue";
import CourseVisual from "../components/CourseVisual/CourseVisual.vue";
import NodeCreationService from "@/components/CourseVisual/NodeCreationService";
import CoreqDataService from "@/services/CoreqDataService";

const { nodes, edges, addNodes, addEdges } = useVueFlow({
  fitViewOnInit: true,
  nodes: [
    // new SingleNode("CSC 131", { x: 0, y: 0 }, new Listing(["CSC 131"])),
    // new SingleNode("CSC 133", { x: 0, y: 50 }, new Listing(["CSC 133", "CIT 133", "MIS 133"], "CSC 133")),
    // new SingleNode("CSC 231", { x: 250, y: 0 }, new Listing(["CSC 231"])),
    // new SingleNode("CSC 220", { x: 250, y: 50 }, new Listing(["ART 220", "CSC 220", "FST 220"], "CSC 220")),
    // new ParentNode("123", { x: -5, y: 100 }),
    // new ChildNode("BIO 201", "123", { x: 5, y: 5 }, new Listing(["BIO 201"])),
    // new ChildNode("BIOL 201", "123", { x: 5, y: 55 }, new Listing(["BIOL 201", "TEST 201"])),
  ],
  edges: [
    /*new HardEdge("CSC 131", "CSC 231"), new SoftEdge("CSC 131", "CSC 220")*/
  ],
});

const ncs = new NodeCreationService(nodes, addNodes);

function retrieveDetailedCoreq(listing: { subj: string; num: number }) {
  CoreqDataService.getDetailedByListing(listing.subj, +listing.num)
    .then((response) => {
      if (response) {
        const detailedCoreq = response.data;
        if (detailedCoreq) {
          ncs.createNode(detailedCoreq);
        } else {
          console.log("unable to get detailed coreq");
        }
      } else {
        console.log("no response");
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
</script>

<template>
  <main>
    <CourseSearch @add-courses-clicked="retrieveDetailedCoreq" />
    <CourseVisual />
  </main>
</template>
