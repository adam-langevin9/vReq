<script setup lang="ts">
// Components
import CourseSearch from "@/components/CourseSearch.vue";
import Flow from "@/components/Flow/Flow.vue";
import AltSelectorPanel from "@/components/AltSelector/AltSelectorPanel.vue";
import Menu from "@/components/Menu.vue";

// Stores
import { useAltSelector } from "@/stores/AltSelectorStore";
import AddCourseButton from "@/components/AddCourseButton.vue";

const altSelector = useAltSelector();
</script>

<template>
  <main :class="altSelector.isOpenThird ? 'condense' : ''">
    <Menu :onSave="() => {}" :onOpen="() => {}" :onExport="() => {}" />
    <PrimeDynamicDialog />
    <CourseSearch />
    <AddCourseButton />
    <Flow />
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
