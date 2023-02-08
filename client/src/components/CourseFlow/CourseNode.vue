<script setup lang="ts">
import { Handle, Position, type HandleConnectable, useNode } from "@vue-flow/core";
import ListingSelect from "./ListingSelect.vue";
import type { CustomNodeData } from "@/classes/CustomNode";
import { computed, watchEffect } from "vue";
import { useCourseFlow } from "@/stores/CourseFlowStore";

const props = defineProps<{
  id: string;
  data: CustomNodeData;
  connectable: HandleConnectable | undefined;
}>();

const self = useNode();
const courseFlow = useCourseFlow();

const outEdges = computed(() => self.connectedEdges.value.filter((edge) => edge.source === props.id));
const shouldHideNode = computed(
  () => !self.node.data.manual && outEdges.value.length > 0 && outEdges.value.every((edge) => edge.data.hidden)
);
const shouldDeleteNode = computed(() => !self.node.data.manual);
const couldDeleteNode = computed(() => outEdges.value.length === 0);

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
    self.node.style = { pointerEvents: "all" };
  }
});
</script>

<template>
  <div class="node">
    <div
      :class="data.courses.length > 1 ? 'inner node flex justify-content-between' : 'flex justify-content-between'"
      v-for="course in data.courses"
    >
      <PrimeButton
        icon="pi pi-check"
        class="p-button-secondary p-button-text flex align-items-center justify-content-center p-button-sm"
        @click="
          () => {
            self.node.data.complete = !self.node.data.complete;
          }
        "
      />
      <ListingSelect
        :detailedCourse="course"
        class="listing flex align-items-center"
        :complete="self.node.data.complete"
      />
      <PrimeButton
        icon="pi pi-search"
        class="p-button-secondary p-button-text flex align-items-center justify-content-center p-button-sm"
        @click="() => courseFlow.search(course)"
      />
      <Handle id="target" type="target" :position="Position.Left" :connectable="connectable" />
      <Handle id="source" type="source" :position="Position.Right" :connectable="connectable" />
    </div>
  </div>
</template>

<style>
.node {
  font-size: 1rem;
  color: #495057;
  border-radius: 3px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  background: #fff;
  white-space: nowrap;
}

.inner.node {
  width: 175px;
  height: 45px;
  margin: 4px;
}
</style>
