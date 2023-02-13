<script setup lang="ts">
import type { CustomEdgeData } from "@/classes/CustomEdge";
import { BaseEdge, getBezierPath, Position, useEdge } from "@vue-flow/core";
import type { GetBezierPathParams } from "@vue-flow/core/dist/components/Edges/utils";
import { computed, watchEffect } from "vue";

const props = defineProps<{
  id: String;
  sourceX: number;
  sourceY: number;
  sourcePosition?: Position;
  targetX: number;
  targetY: number;
  targetPosition?: Position;
  curvature?: number;
  data: CustomEdgeData;
  markerEnd?: string;
  style?: Object;
}>();

const path = computed(() => getBezierPath(props as GetBezierPathParams));
const self = useEdge();
watchEffect(() => {
  props.data.hidden =
    (self.edge.targetNode.data as CustomEdgeData).hidden ||
    props.data.altCombo?.selectedOptionID !== props.data.altCombo?.optionID;
});
</script>

<template>
  <BaseEdge v-if="!props.data.hidden" :id="id" :path="path[0]" :marker-end="markerEnd" />
</template>

<style></style>
