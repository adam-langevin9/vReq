<script lang="ts" setup>
import { VueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls, ControlButton } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { useEditor } from "@/stores/Editor.store";
import { useCourseFlow } from "@/stores/CourseFlow.store";
import { MenuNames, useDock } from "@/stores/MenusDock.store";

const courseFlow = useCourseFlow();
const editor = useEditor();
const menusDock = useDock();

const visualWidth = menusDock.isPrintSelected ? "8.5in" : "100%";
const visualHeight = menusDock.isPrintSelected ? "10.5in" : "100%";

function printFlowData() {
  console.log("==========");
  console.log("Flow Data");
  console.log("----------");
  console.log(courseFlow.toObject());
  console.log("==========");
}
function loadLocalStorage() {
  console.log("==========");
  console.log("Load Storage");
  console.log("----------");
  console.log(localStorage.getItem("course-flow"));
  courseFlow.load(localStorage.getItem("course-flow")!);
  console.log("==========");
}
</script>

<template>
  <!-- <PrimeButton label="Flow Data" @click="printFlowData" style="position: fixed; top: 100px; left: 40px" />
  <PrimeButton label="Load Storage" @click="loadLocalStorage" style="position: fixed; top: 200px; left: 40px" /> -->

  <div class="flow-container flex justify-content-center flex-column">
    <VueFlow
      id="course-flow"
      :class="
        (menusDock.isPrintSelected ? 'print-size' : 'screen-size') +
        ' flex justify-content-center align-items-center align-self-stretch flex-grow-1'
      "
      :node-types="courseFlow.nodeTypes"
      :edge-types="courseFlow.edgeTypes"
      :default-zoom="1.5"
      :min-zoom="0.2"
      :max-zoom="4"
    >
      <PrimeSpinner v-if="editor.isLoadingFlow" style="z-index: 10" />
      <Background class="background" />
      <MiniMap />
      <Controls
        :showInteractive="false"
        :show-fit-view="false"
        :show-zoom="false"
        :fitViewParams="{ duration: 200 }"
        style="border-radius: 2rem"
      >
        <div class="flex flex-column">
          <PrimeButton
            icon="pi pi-search-plus"
            @click="courseFlow.zoomIn"
            class="p-button-rounded p-button-text p-button-secondary"
          />
          <PrimeButton
            icon="pi pi-search-minus"
            @click="courseFlow.zoomOut"
            class="p-button-rounded p-button-text p-button-secondary"
          />
          <PrimeButton
            icon="pi pi-search"
            @click="courseFlow.fitView"
            class="p-button-rounded p-button-text p-button-secondary"
          />
        </div>
      </Controls>
    </VueFlow>
  </div>
</template>

<style scoped>
.flow-container {
  min-height: 100vh;
  padding: 4vh 5vw 4vh 9vw;
}
.screen-size {
  width: 100%;
  height: 100%;
}
.print-size {
  width: 8.5in;
  height: 10.5in;
}
.background {
  height: 100%;
}
</style>
