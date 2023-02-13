<script setup lang="ts">
import { Handle, Position, type HandleConnectable, useNode } from "@vue-flow/core";
import type { DegreeNodeData } from "@/classes/CustomNode";
import { computed, watchEffect } from "vue";
import { useFlow } from "@/stores/FlowStore";

defineProps<{
  id: string;
  data: DegreeNodeData;
  connectable: HandleConnectable | undefined;
}>();

const self = useNode();
const flow = useFlow();

const shouldDeleteNode = computed(() => !self.node.data.manual);
self.node.style = { pointerEvents: "none", opacity: "0" };

watchEffect(() => {
  if (shouldDeleteNode.value) {
    flow.removeNodes([self.node]);
  }
});
</script>

<template>
  <div class="node">
    <div>
      <Handle id="target" type="target" :position="Position.Left" :connectable="connectable" />
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
</style>
