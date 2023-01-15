<script lang="ts" setup>
import { Listing } from "../../../../classes/Listing";
import { Handle, Position } from "@vue-flow/core";
import ListingSelect from "../NodeComponents/ListingSelect.vue";
import NodeMenu from "../NodeComponents/NodeMenu.vue";
defineProps({
  data: {
    type: Listing,
    required: true,
  },
  connectable: Boolean,
});
</script>

<template>
  <div class="node">
    <div class="flex justify-content-between">
      <NodeMenu />
      <ListingSelect :listing="data" class="listing flex align-items-center justify-content-center" />
      <PrimeButton
        icon="pi pi-search"
        class="p-button-secondary p-button-text flex align-items-center justify-content-center p-button-sm"
      />
    </div>
    <Handle id="target" type="target" :position="Position.Left" :connectable="connectable" />
    <Handle id="source" type="source" :position="Position.Right" :connectable="connectable" />
  </div>
</template>

<style scoped></style>
