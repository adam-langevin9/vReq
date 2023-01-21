<script setup lang="ts">
import { useVueFlow } from "@vue-flow/core";
import CourseSearch from "../components/CourseSearch.vue";
import CourseVisual from "../components/CourseVisual/CourseVisual.vue";
import GraphCreationService from "@/components/CourseVisual/GraphCreationService";
import CoreqDataService from "@/services/CoreqDataService";

const { nodes, edges, addNodes, addEdges, toObject } = useVueFlow({
  fitViewOnInit: true,
  nodes: [],
  edges: [],
});

const nodeCreationService = new GraphCreationService(nodes, addNodes, edges, addEdges);

function retrieveDetailedCoreq(listing: { subj: string; num: number }) {
  CoreqDataService.getDetailedByListing(listing.subj, +listing.num)
    .then((response) => {
      const detailedCoreq = response?.data;
      if (detailedCoreq) {
        nodeCreationService.createNodeWAncestors(detailedCoreq);
      } else {
        console.log("unable to get detailed coreq");
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

function printData() {
  console.log("--------");
  console.log(toObject());
}
</script>

<template>
  <main>
    <CourseSearch @add-courses-clicked="retrieveDetailedCoreq" />
    <CourseVisual />
    <PrimeButton label="Data" @click="printData" style="position: fixed; top: 20px; left: 20px" />
  </main>
</template>
