<script setup lang="ts">
import type { AltReq } from "@/classes/AltReqGroup";
import { ref, watch, type Ref } from "vue";
import { getOutgoers, useVueFlow } from "@vue-flow/core";
import { CustomEdge } from "@/classes/Edge";

const vueFlow = useVueFlow();

const props = defineProps<{
  targetID: string;
  reqIdx: number;
  req: AltReq;
}>();

watch(
  () => props.req.selectedOpt,
  (newOpt, oldOpt) => {
    oldOpt.forEach((coreq) => {
      const edge = vueFlow.findEdge(CustomEdge.createEdgeID(coreq.id.toString(), props.targetID));
      const node = vueFlow.findNode(coreq.id.toString());
      if (edge) {
        edge.hidden = true;
      }
      if (node && !node.data.manual && getOutgoers(node, vueFlow.getElements.value).length === 0) {
        node.hidden = true;
      }
    });
    newOpt.forEach((coreq) => {
      const edge = vueFlow.findEdge(CustomEdge.createEdgeID(coreq.id.toString(), props.targetID));
      const node = vueFlow.findNode(coreq.id.toString());
      if (node) {
        node.hidden = false;
      }
      if (edge) {
        edge.hidden = false;
      }
    });
  }
);
</script>

<template>
  <div class="flex justify-content-center align-items-center">
    <h3>Requirement {{ reqIdx }}</h3>
  </div>
  <div class="flex justify-content-center align-items-start flex-wrap">
    <div v-for="optIdx in req.opts.length" class="flex flex-column justify-content-center align-items-center px-7 py-3">
      <PrimeRadioButton
        :name="'req'.concat(reqIdx.toString())"
        :inputId="'opt'.concat(optIdx.toString())"
        :value="req.opts[optIdx - 1]"
        v-model="req.selectedOpt"
        class="align-items-center"
      />
      <label :for="'opt'.concat(optIdx.toString())" class="flex flex-column justify-content-center align-items-center">
        <div v-for="element in req.opts[optIdx - 1]" class="flex flex-column justify-content-center align-items-center">
          {{ element.getListingsString() }}
        </div>
      </label>
    </div>
  </div>
</template>

<style scoped></style>
