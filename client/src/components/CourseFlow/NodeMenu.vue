<script setup lang="ts">
import type { GraphNode, VueFlowStore } from "@vue-flow/core";
import type Menu from "primevue/menu";

defineProps<{
  node: GraphNode<any, any>;
  vueFlow: VueFlowStore;
}>();
</script>
<script lang="ts">
export default {
  data() {
    return {
      items: [
        { label: this.group ? "Mark Complete" : "Mark Complete", icon: "pi pi-check", command: () => {} },
        {
          label: this.group ? "View Alternates" : "View Alternates",
          icon: "pi pi-eye",
          command: () => {},
        },
        {
          label: this.group ? "Remove Group" : "Remove Course",
          icon: "pi pi-trash",
          command: () => {
            this.vueFlow.removeNodes([this.node]);
          },
        },
      ],
    };
  },
  computed: {
    group() {
      return this.node.data.courses.length > 1;
    },
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
