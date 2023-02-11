<script setup lang="ts">
import { getSelectedListings } from "@/classes/CustomNode";
import { useCourseFlow } from "@/stores/CourseFlowStore";
import CourseChip from "./CourseChip.vue";
const courseFlow = useCourseFlow();
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
      <CourseChip
        v-for="node in courseFlow.getNodes
          .filter((node) => node.data.manual)
          .sort((a, b) => getSelectedListings(a).localeCompare(getSelectedListings(b)))"
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
