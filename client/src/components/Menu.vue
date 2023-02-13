<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  onSave: () => void;
  onOpen: () => void;
  onExport: () => void;
}>();

const menu = ref();
const items = ref([
  { label: "Open", icon: "pi pi-folder-open", command: props.onOpen },
  { label: "Save", icon: "pi pi-save", command: props.onSave },
  { label: "Export", icon: "pi pi-file-export", command: props.onExport },
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
