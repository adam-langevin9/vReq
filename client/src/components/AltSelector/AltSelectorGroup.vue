<script setup lang="ts">
import type { CustomEdgeData } from "@/classes/CustomEdge";
import { ref } from "vue";
import AltSelectorReq from "./AltSelectorReq.vue";

const props = defineProps<{
  altReqs: Array<{ id: string; target: string; source: string; data: CustomEdgeData }>;
}>();

const altReqComboIDs = ref(Array.from(new Set(props.altReqs.map((altReq) => altReq.data.altCombo!.comboID))));
const getReqIdx = (comboID: number) => altReqComboIDs.value.indexOf(comboID) + 1;
const getOptionsFor = (comboID: number) => props.altReqs.filter((altReq) => altReq.data.altCombo!.comboID === comboID);
</script>

<template>
  <div v-for="comboID in altReqComboIDs">
    <PrimeDivider v-if="getReqIdx(comboID) > 1" />
    <AltSelectorReq :reqIdx="getReqIdx(comboID)" :options="getOptionsFor(comboID)" />
  </div>
</template>

<style scoped></style>
