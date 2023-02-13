<script setup lang="ts">
import { ref } from "vue";
import type { CustomEdgeData } from "@/classes/CustomEdge";
import { useFlow } from "@/stores/FlowStore";
import { getSelectedName } from "@/classes/CustomNode";

const flow = useFlow();

const props = defineProps<{
  reqIdx: number;
  options: Array<{ id: string; target: string; source: string; data: CustomEdgeData }>;
}>();

const selectedOption = ref(props.options[0].data.altCombo!.selectedOptionID);
props.options.forEach((option) => (flow.findEdge(option.id)!.data.altCombo.selectedOptionID = selectedOption));

const selectEdges = () =>
  props.options.forEach((option) => (option.data.altCombo!.selectedOptionID = selectedOption.value));
</script>
<script lang="ts">
export default {
  computed: {
    optionIDs() {
      return Array.from(new Set(this.options.map((req) => req.data.altCombo!.optionID)));
    },
  },
};
</script>

<template>
  <div class="flex justify-content-center align-items-center">
    <h3>Requirement {{ reqIdx }}</h3>
  </div>
  <div class="flex justify-content-center align-items-start flex-wrap">
    <div v-for="optionID in optionIDs" class="flex flex-column justify-content-center align-items-center px-7 py-3">
      <PrimeRadioButton
        :name="reqIdx.toString()"
        :value="optionID"
        v-model="selectedOption"
        class="align-items-center"
        @change="selectEdges"
      />
      <label :for="optionID.toString()" class="flex flex-column justify-content-center align-items-center">
        <div
          v-for="element in options.filter(edge=>edge.data.altCombo!.optionID===optionID)"
          class="flex flex-column justify-content-center align-items-center"
        >
          {{ getSelectedName(flow.findNode(element.source)!) }}
        </div>
      </label>
    </div>
  </div>
</template>
