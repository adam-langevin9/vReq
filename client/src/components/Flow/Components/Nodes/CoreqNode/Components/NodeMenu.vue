<script setup lang="ts">
import type { GraphNode } from "@vue-flow/core";
import type Menu from "primevue/menu";
import { useCourseFlow } from "@/stores/CourseFlow.store";

defineProps<{
  node: GraphNode<any, any>;
}>();
</script>
<script lang="ts">
export default {
  data() {
    return {
      items: [
        { label: "Mark Complete", icon: "pi pi-check", command: () => {} },
        {
          label: "View Alternates",
          icon: "pi pi-eye",
          command: () => {},
        },
        {
          label: this.isCoreq() ? "Remove Group" : "Remove Course",
          icon: "pi pi-trash",
          command: () => {
            useCourseFlow().removeNodes([this.node]);
          },
        },
      ],
    };
  },
  computed: {},
  methods: {
    toggle(event: Event) {
      (this.$refs.menu as InstanceType<typeof Menu>).toggle(event);
    },
    isCoreq() {
      return this.node.data.courses.length > 1;
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
