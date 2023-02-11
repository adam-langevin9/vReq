<script setup lang="ts">
import { computed, ref, type ComputedRef } from "vue";

const menu = ref();
const items = ref([
  { label: "Save", icon: "pi pi-save" },
  { label: "Open", icon: "pi pi-folder-open" },
  { label: "Import Major", icon: "pi pi-map" },
  { label: "Export Image", icon: "pi pi-file-export" },
]);

const toggle = (e: Event) => {
  menu.value.toggle(e);
};
</script>
<template>
  <PrimeButton
    icon="pi pi-bars"
    type="button"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_menu"
    class="menu-button p-button-rounded p-button-primary"
  />
  <PrimeMenu id="overlay_menu" ref="menu" :model="items" :popup="true" />
</template>
<style scoped>
.menu-button {
  position: absolute;
  top: 2rem;
  left: 2rem;
}
</style>
