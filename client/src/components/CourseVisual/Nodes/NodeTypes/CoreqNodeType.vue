<script lang="ts" setup>
import { Listing } from "../../../../classes/Listing";
import ListingSelect from "../NodeComponents/ListingSelect.vue";
import NodeMenu from "../NodeComponents/NodeMenu.vue";
defineProps({
  data: {
    type: Listing,
    required: true,
  },
});
</script>

<template>
  <div class="node">
    <div class="flex justify-content-between">
      <NodeMenu opt3="Remove Group" />
      <ListingSelect :listing="data" class="listing flex align-items-center justify-content-center" />
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
