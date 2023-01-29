<script setup lang="ts">
import CourseSearch from "../components/CourseSearch.vue";
import CourseFlow from "../components/CourseFlow/CourseFlow.vue";
import AltSelector from "@/components/AltSelector.vue";
import { useCourseFlow } from "@/stores/CourseFlowStore";
import { getIncomers, type GraphNode, isNode } from "@vue-flow/core";
import type { ICustomNodeData } from "@/classes/Nodes/Node";

const CourseFlowStore = useCourseFlow();

function printFlowData() {
  console.log("==========");
  console.log("Flow Data");
  console.log("----------");
  console.log(CourseFlowStore.vueFlowStore.toObject());
  console.log("==========");
}
</script>

<template>
  <main>
    <CourseSearch />
    <div class="flex justify-content-center">
      <PrimeButton
        label="Add Course(s)"
        icon="pi"
        iconPos="right"
        class="m-2"
        @click="CourseFlowStore.addCoreqToFlow"
      />
    </div>
    <CourseFlow />
    <AltSelector />
    <PrimeButton label="Flow Data" @click="printFlowData" style="position: fixed; top: 20px; left: 20px" />
  </main>
</template>
