<script lang="ts">
import type Menu from "primevue/menu";

export default {
  props: {
    opt1: String,
    opt2: String,
    opt3: String,
    class: String,
  },
  data() {
    return {
      items: [
        { label: this.opt1 ?? "Mark Complete", icon: "pi pi-check", command: () => {} },
        { label: this.opt2 ?? "View Alternates", icon: "pi pi-eye", command: () => {} },
        { label: this.opt3 ?? "Remove Course", icon: "pi pi-trash", command: () => {} },
      ],
    };
  },
  methods: {
    toggle(event: Event) {
      (this.$refs.menu as InstanceType<typeof Menu>).toggle(event);
    },
  },
};
</script>

<template>
  <PrimeButton
    icon="pi pi-ellipsis-v"
    class="p-button-secondary p-button-text flex align-items-center justify-content-center p-button-sm"
    type="button"
    @click="toggle"
  />
  <PrimeMenu ref="menu" :model="items" :popup="true" />
</template>

<style scoped></style>
