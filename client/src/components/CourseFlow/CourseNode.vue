<script setup lang="ts">
import { Handle, Position, type HandleConnectable, useNode, useVueFlow } from "@vue-flow/core";
import ListingSelect from "./ListingSelect.vue";
import NodeMenu from "./NodeMenu.vue";
import type { ICustomNodeData } from "@/classes/Node";
import { computed, watchEffect } from "vue";

const props = defineProps<{
  id: string;
  data: ICustomNodeData;
  connectable: HandleConnectable | undefined;
}>();

const self = useNode();
const vueFlow = useVueFlow();

const outEdges = computed(() => self.connectedEdges.value.filter((edge) => edge.source === props.id));
const shouldHideNode = computed(
  () => !self.node.data.manual && outEdges.value.length > 0 && outEdges.value.every((edge) => edge.data.hidden)
);
const shouldDeleteNode = computed(() => !self.node.data.manual);
const couldDeleteNode = computed(() => outEdges.value.length === 0);

watchEffect(() => {
  if (couldDeleteNode.value) {
    self.node.deletable = true;
  }
  if (shouldDeleteNode.value) {
    vueFlow.removeNodes([self.node]);
  } else if (shouldHideNode.value) {
    props.data.hidden = true;
    self.node.style = { pointerEvents: "none" };
  } else {
    props.data.hidden = false;
    self.node.style = { pointerEvents: "all" };
  }
});
</script>

<template>
  {{ shouldDeleteNode }}
  <div v-if="!props.data.hidden" class="node">
    <div
      :class="data.courses.length > 1 ? 'inner node flex justify-content-between' : 'flex justify-content-between'"
      v-for="course in data.courses"
    >
      <NodeMenu :group="data.courses.length > 1 ? true : false" :node="self.node" :vueFlow="vueFlow" />
      <ListingSelect :detailedCourse="course" class="listing flex align-items-center justify-content-center" />
      <PrimeButton
        icon="pi pi-search"
        class="p-button-secondary p-button-text flex align-items-center justify-content-center p-button-sm"
      />
      <Handle id="target" type="target" :position="Position.Left" :connectable="connectable" />
      <Handle id="source" type="source" :position="Position.Right" :connectable="connectable" />
    </div>
  </div>
  {{ self.node.deletable }}
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

.hide {
  display: "none" !important;
  pointer-events: "none" !important;
}

.vue-flow__handle {
  opacity: 0;
}
</style>
