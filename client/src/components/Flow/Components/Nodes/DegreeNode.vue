<script setup lang="ts">
import type { HandleConnectable } from "@vue-flow/core";
import { Handle, Position, useNode } from "@vue-flow/core";
import type { DegreeNodeData } from "@/classes/CustomNode";
import { computed, watchEffect } from "vue";
import { useCourseFlow } from "@/stores/CourseFlow.store";

defineProps<{
  id: string;
  data: DegreeNodeData;
  connectable: HandleConnectable | undefined;
}>();

const self = useNode();
const courseFlow = useCourseFlow();

const shouldDeleteNode = computed(() => !self.node.data.manual);
self.node.style = { pointerEvents: "none", opacity: "0" };

watchEffect(() => {
  if (shouldDeleteNode.value) {
    courseFlow.removeNodes([self.node]);
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

<style scoped>
.node {
  pointer-events: none;
  opacity: 0;
}
</style>
