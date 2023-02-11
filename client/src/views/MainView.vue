<script setup lang="ts">
import CourseSearch from "@/components/CourseSearch.vue";
import CourseFlow from "@/components/CourseFlow/CourseFlow.vue";
import AltSelectorPanel from "@/components/AltSelector/AltSelectorPanel.vue";
import Menu from "@/components/CourseFlow/Menu.vue";

import { useAltSelector } from "@/stores/AltSelectorStore";

const altSelector = useAltSelector();
</script>

<template>
  <main :class="altSelector.isOpenThird ? 'condense' : ''">
    <Menu />
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
