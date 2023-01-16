<script lang="ts" setup>
import { DetailedCoreq } from "@/classes/DetailedCoreq";
import { DetailedCourse } from "@/classes/DetailedCourse";
import ListingSelect from "../NodeComponents/ListingSelect.vue";
import NodeMenu from "../NodeComponents/NodeMenu.vue";
defineProps({
  data: {
    type: DetailedCourse,
    required: true,
  },
});
</script>

<template>
  <div class="node">
    <div class="flex justify-content-between">
      <NodeMenu opt3="Remove Group" />
      <ListingSelect :detailedCourse="data" class="listing flex align-items-center justify-content-center" />
      <PrimeButton
        icon="pi pi-search"
        class="p-button-secondary p-button-text flex align-items-center justify-content-center p-button-sm"
      />
    </div>
  </div>
</template>

<style scoped>
.node {
  cursor: default;
}
</style>
