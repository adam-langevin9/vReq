<script setup lang="ts">
import { Handle, Position, type HandleConnectable, useNode } from "@vue-flow/core";
import ListingSelect from "./Components/ListingSelect.vue";
import type { CoreqNodeData } from "@/classes/CustomNode";
import { computed, watch, watchEffect } from "vue";
import { useCourseFlow } from "@/stores/CourseFlow.store";
import { useEditor } from "@/stores/Editor.store";
import { useDock, MenuNames } from "@/stores/MenusDock.store";
import { usePrinter } from "@/stores/Printer.store";

const props = defineProps<{
  id: string;
  data: CoreqNodeData;
  connectable: HandleConnectable | undefined;
}>();

const self = useNode();
const courseFlow = useCourseFlow();
const editor = useEditor();
const dock = useDock();
const printer = usePrinter();

const inEdges = computed(() => self.connectedEdges.value.filter((edge) => edge.target === props.id));
const outEdges = computed(() => self.connectedEdges.value.filter((edge) => edge.source === props.id));
const shouldHideNode = computed(
  () => !self.node.data.manual && outEdges.value.length > 0 && outEdges.value.every((edge) => edge.data.hidden)
);
const shouldDeleteNode = computed(() => !self.node.data.manual);
const couldDeleteNode = computed(() => outEdges.value.length === 0);
const isDegreeReq = computed(() => outEdges.value.some((edge) => edge.target[0] === "d"));
watchEffect(() => {
  self.node.data.available =
    !inEdges.value.filter((edge) => !edge.data.hidden) ||
    inEdges.value.filter((edge) => !edge.data.hidden).every((edge) => edge.sourceNode.data.complete);
});

watchEffect(() => {
  self.node.data.semiAvailable =
    !inEdges.value.filter((edge) => !edge.data.hidden) ||
    inEdges.value
      .filter((edge) => !edge.data.hidden)
      .every(
        (edge) =>
          edge.sourceNode.data.complete ||
          (edge.animated && courseFlow.findNode(edge.source)!.data.available) ||
          (edge.animated && courseFlow.findNode(edge.source)!.data.semiAvailable)
      );
});

watchEffect(() => {
  if (couldDeleteNode.value) {
    self.node.deletable = true;
    if (shouldDeleteNode.value) {
      courseFlow.removeNodes([self.node]);
    }
  } else if (shouldHideNode.value) {
    self.node.data.hidden = true;
    self.node.style = { pointerEvents: "none", opacity: "0" };
  } else {
    props.data.hidden = false;
    self.node.style = { opacity: "1" };
  }
});
</script>

<template>
  <div
    :class="
      'node ' +
      (isDegreeReq ? 'degreeReq ' : '') +
      (self.node.data.complete
        ? 'complete '
        : self.node.data.available
        ? 'available '
        : self.node.data.semiAvailable
        ? 'semiAvailable '
        : '') +
      (printer.isColor ? 'print-color' : 'print-bw')
    "
  >
    <div
      :class="data.courses.length > 1 ? 'inner node flex justify-content-between' : 'flex justify-content-between'"
      v-for="course in data.courses"
    >
      <PrimeButton
        :icon="self.node.data.complete ? 'pi pi-check-square' : 'pi pi-stop'"
        class="p-button-secondary p-button-text flex align-items-center justify-content-center p-button-sm"
        @click="
          () => {
            self.node.data.complete = !self.node.data.complete;
          }
        "
      />
      <ListingSelect :detailedCourse="course" class="listing flex align-items-center" :isDegreeReq="isDegreeReq" />
      <PrimeButton
        icon="pi pi-info-circle"
        class="p-button-secondary p-button-text flex align-items-center justify-content-center p-button-sm"
        @click="
          () => {
            editor.searchLoaded(course);
            dock.open(MenuNames.EDITOR);
          }
        "
      />
      <Handle id="target" type="target" :position="Position.Left" :connectable="connectable" />
      <Handle id="source" type="source" :position="Position.Right" :connectable="connectable" />
    </div>
  </div>
</template>

<style>
.node {
  font-size: 1rem;
  color: #000;
  border-radius: 3px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  background-color: #fff;
  white-space: nowrap;
}
.p-button.p-button-text {
  color: #000 !important;
}

.complete {
  background-color: var(--success-color-light);
}

.available {
  background-color: var(--warning-color-light);
  text-decoration: underline;
}

.semiAvailable {
  background-color: var(--danger-color-light);
  text-decoration: dotted underline;
}

.degreeReq {
  border-color: var(--info-color);
}
.inner.node {
  width: 175px;
  height: 45px;
  margin: 4px;
  background-color: transparent;
}
.hide {
  pointer-events: none;
  opacity: 0;
}

.print-size .print-color {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
.print-size .print-bw {
  background-color: #fff;
  border-color: #000;
}
</style>
