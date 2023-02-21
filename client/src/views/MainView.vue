<script setup lang="ts">
// Components
import Flow from "@/components/Flow/Flow.vue";

// Stores
import MenuDock from "@/components/Menus/MenusDock.vue";
import { useDock } from "@/stores/MenusDock.store";

const dock = useDock();
</script>

<template>
  <main :class="dock.isAnySelected ? 'condense' : ''">
    <MenuDock />
    <PrimeToast />
    <Flow />
  </main>
</template>

<style>
html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
}
main {
  width: 100%;
  transform: translateX(0) scaleX(1);
  transform-origin: left;
  transition: width 0.3s, transform 0.3s;
}
.condense {
  width: calc(100% - 30rem);
  transform: translateX(30rem);
  transform-origin: left;
}

@media print {
  *:not(style, title) {
    display: block;
  }
  .p-dock,
  .vue-flow__minimap,
  .vue-flow__controls,
  .p-sidebar-mask {
    display: none !important;
  }
  .flow-container {
    width: 8in;
    height: 10.5in;
    padding: 0 !important;
  }
  .vue-flow__handle {
    opacity: 0;
  }
  .condense {
    width: inherit;
    transform: translateX(0) scaleX(1);
  }
}
</style>
