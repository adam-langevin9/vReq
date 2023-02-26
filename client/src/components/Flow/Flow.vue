<script lang="ts" setup>
import { VueFlow, type GraphNode } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { useEditor } from "@/stores/Editor.store";
import { useCourseFlow } from "@/stores/CourseFlow.store";
import { useDock } from "@/stores/MenusDock.store";
import { usePrinter } from "@/stores/Printer.store";

const courseFlow = useCourseFlow();
const editor = useEditor();
const menusDock = useDock();
const printer = usePrinter();
</script>

<template>
  <PrimeBlockUI :blocked="menusDock.isPrintSelected">
    <div class="flow-container flex justify-content-center flex-column">
      <VueFlow
        id="course-flow"
        :class="
          (menusDock.isPrintSelected ? 'print-size' : 'screen-size flex-grow-1') +
          ' flex justify-content-center align-items-center align-self-stretch '
        "
        :node-types="courseFlow.nodeTypes"
        :edge-types="courseFlow.edgeTypes"
        :default-zoom="1.5"
        :min-zoom="0.2"
        :max-zoom="4"
      >
        <PrimeSpinner v-if="editor.isLoadingFlow" style="z-index: 10" />
        <Background class="background" />
        <div class="vue-flow__panel top right node-key"></div>
        <MiniMap style="box-shadow: 0px 10px 1px -7px rgb(0 0 0 / 20%), 0px 1px 3px 3px rgb(0 0 0 / 14%)" />
        <Controls
          :showInteractive="false"
          :show-fit-view="false"
          :show-zoom="false"
          :fitViewParams="{ duration: 200 }"
          style="border-radius: 2rem; box-shadow: 0px 10px 1px -7px rgb(0 0 0 / 20%), 0px 1px 3px 3px rgb(0 0 0 / 14%)"
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
    <div v-if="printer.includeDescr" class="print-size course-descr">
      <div v-for="course in courseFlow.getVisibleSelectedListings" class="inline-block" style="width: 100%">
        <PrimeCard>
          <template #title>{{ course.listing }}</template>
          <template #subtitle> {{ course.title }}</template>
          <template #content>
            {{ course.descr }}
          </template>
          <template #footer>
            <span v-if="course.hours">Credit Hours: {{ course.hours }} </span></template
          >
        </PrimeCard>
        <PrimeDivider />
      </div>
    </div>
  </PrimeBlockUI>
</template>

<style scoped>
.flow-container {
  min-height: 100vh;
  padding: 0 0 0 3rem;
}
.screen-size {
  width: 100%;
  height: 100%;
}
.background {
  height: 100%;
}
:deep(.p-component-overlay) {
  background-color: transparent !important;
}
:deep(.p-card) {
  border: 0;
  border-radius: 0;
  box-shadow: none;
  width: 100%;
}
:deep(.p-card-content) {
  font-size: small;
}
:deep(.p-card-footer) {
  font-size: small;
}
.course-descr {
  display: none;
}
.print-size {
  width: 8in;
  height: 10.5in;
  border: 1px solid rgb(0 0 0 / 50%);
  pointer-events: none;
  box-shadow: 0px 10px 10px 0px rgb(0 0 0 / 20%), 3px 3px 3px 3px rgb(0 0 0 / 14%);
}
.print-size > .vue-flow__minimap,
.print-size > .vue-flow__controls {
  display: none;
}
.print-size:deep(.background) {
  opacity: 0;
}

.flow-container:has(.print-size) {
  padding: 3rem 3rem 3rem 6rem;
}

@media print {
  .print-size {
    width: 8in;
    height: 10.5in;
    border: none;
    box-shadow: none;
  }

  .course-descr {
    display: block;
  }
}
</style>
