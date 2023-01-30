<script setup lang="ts">
import type { AltReq } from "@/classes/AltReqGroup";
import AltSelectorReq from "./AltSelectorReq.vue";

defineProps<{
  altReqGroup: {
    targetID: string;
    listings: string;
    reqs: AltReq[];
  };
}>();
</script>

<template>
  <div v-for="reqIdx in altReqGroup.reqs.length">
    <PrimeDivider v-if="reqIdx > 1" />
    <AltSelectorReq :targetID="altReqGroup.targetID" :reqIdx="reqIdx" :req="altReqGroup.reqs[reqIdx - 1]" />
  </div>
</template>

<style scoped></style>
