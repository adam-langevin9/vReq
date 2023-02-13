<script setup lang="ts">
import { getSelectedName } from "@/classes/CustomNode";
import { useFlow } from "@/stores/FlowStore";
import ManualNodeChip from "./ManualNodeChip.vue";
const flow = useFlow();
</script>
<script lang="ts">
export default {
  methods: {
    forceUpdate() {
      console.log("forcing update");
      this.$forceUpdate();
    },
  },
};
</script>
<template>
  <div class="flex flex-row flex-wrap m-2 align-items-center justify-content-center">
    <div class="flex flex-row flex-wrap m-2 chips">
      <ManualNodeChip
        v-for="node in flow.getNodes
          .filter((node) => node.data.manual)
          .sort((a, b) => getSelectedName(a).localeCompare(getSelectedName(b)))"
        :node="node"
        class="flex align-items-center justify-content-center m-1"
      />
    </div>
  </div>
</template>
<style scoped>
.chips {
  width: 80%;
}
</style>
