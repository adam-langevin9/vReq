<script setup lang="ts">
import CourseSearch from "../components/CourseSearch.vue";
import CourseFlow from "../components/CourseFlow/CourseFlow.vue";
import { useCourseFlow } from "@/stores/CoursFlowStore";
import AltSelectorPanel from "@/components/AltSelector/AltSelectorPanel.vue";
import { useAltSelector } from "@/stores/AltSelectorStore";

const courseFlow = useCourseFlow();
const altSelector = useAltSelector();
</script>

<template>
  <!-- <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
    <div class="text-700 text-center">
      <div class="text-900 font-bold text-5xl mb-3">Vue Flow</div>
      <div class="text-700 text-2xl mb-5">Map out your future.</div>
      <img src="@/../public/favicon.ico" />
    </div>
  </div> -->
  <main :class="altSelector.isOpenThird ? 'condense' : ''">
    <CourseSearch />
    <CourseFlow />
  </main>
  <AltSelectorPanel />
</template>

<style>
html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
}
main {
  width: 100%;
  -webkit-transition: width 0.25s ease-in-out;
  -moz-transition: width 0.25s ease-in-out;
  -o-transition: width 0.25s ease-in-out;
  transition: width 0.25s ease-in-out;
}
.condense {
  width: -webkit-calc(100% - 480px);
  width: -moz-calc(100% - 480px);
  width: -o-calc(100% - 480px);
  width: calc(100% - 480px);
}
</style>
