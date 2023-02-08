<script setup lang="ts">
import { getListings } from "@/classes/CustomNode";
import { useCourseFlow } from "@/stores/CourseFlowStore";
const courseFlow = useCourseFlow();
</script>
<template>
  <div class="flex flex-row flex-wrap m-2 align-items-center justify-content-center">
    <div class="flex flex-row flex-wrap m-2 chips">
      <PrimeChip
        v-for="node in courseFlow.getNodes
          .filter((node) => node.data.manual)
          .sort((a, b) => getListings(a).localeCompare(getListings(b)))"
        :label="getListings(node)"
        @remove="
          () => {
            node.data.manual = false;
          }
        "
        class="flex align-items-center justify-content-center m-1"
        removable
      />
    </div>
  </div>
</template>
<style scoped>
.chips {
  width: 80%;
}
</style>
