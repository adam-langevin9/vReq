<script setup lang="ts">
// Components
import ConfirmToast from "@/components/ConfirmToast.vue";
import Flow from "@/components/Flow/Flow.vue";

// Stores
import MenuDock from "@/components/Menus/MenusDock.vue";
import { useConfirmToast } from "@/stores/ConfirmToast.store";
import { useDock } from "@/stores/MenusDock.store";

const dock = useDock();
const confirmToast = useConfirmToast();
</script>

<template>
  <PrimeBlockUI :blocked="confirmToast.isOpen" style="z-index: 1104" :fullScreen="true" />
  <div :class="(dock.isAnySelected ? 'condense' : '') + ' p-dock-container'">
    <MenuDock />
  </div>
  <main :class="dock.isAnySelected ? 'condense' : ''">
    <Flow />
  </main>
  <ConfirmToast position="bottom-left" />
  <PrimeToast position="bottom-left" />
</template>

<style>
html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
}
.p-component-overlay {
  background-color: rgba(255, 255, 255, 0.4) !important;
}
main {
  width: 100%;
  transform: translateX(0) scaleX(1);
  transform-origin: left;
  transition: width 0.3s, transform 0.3s;
}
main.condense {
  width: calc(100% - 30rem);
  transform: translateX(30rem) !important;
  transform-origin: left !important;
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
    width: 8in !important;
    height: 10.5in !important;
    padding: 0 !important;
  }
  .vue-flow__handle {
    opacity: 0;
  }
  main.condense,
  .condense {
    width: inherit;
    transform: translateX(0) scaleX(1) !important;
  }
}
</style>
