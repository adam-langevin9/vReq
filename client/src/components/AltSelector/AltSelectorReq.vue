<script setup lang="ts">
import type { AltReq } from "@/classes/AltReqGroup";
import { watch } from "vue";
import { useVueFlow } from "@vue-flow/core";
import { CustomEdge } from "@/classes/CustomEdge";

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
      if (edge) {
        edge.data.selected = false;
      }
    });
    newOpt.forEach((coreq) => {
      const edge = vueFlow.findEdge(CustomEdge.createEdgeID(coreq.id.toString(), props.targetID));
      if (edge) {
        edge.data.selected = true;
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
