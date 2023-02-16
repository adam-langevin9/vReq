<script setup lang="ts">
// Components
import Flow from "@/components/Flow/Flow.vue";

// Stores
import MenuDock from "@/components/Menus/MenuDock.vue";
import { useMenuDock } from "@/stores/Menus/MenuDock.store";

const menuDock = useMenuDock();
</script>

<template>
  <main :class="menuDock.displayMenu ? 'condense' : ''">
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
  transition: width 0.25s ease-in-out;
  transition: transform 0.25s ease-in-out;
}
.condense {
  width: calc(100% - 30rem);
  transform: translateX(30rem);
  transform-origin: left;
}
</style>
