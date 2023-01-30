<script setup lang="ts">
import { DetailedCoreq } from "@/classes/Coreq";
import type { ICourseNodeData } from "@/classes/Node";
import { useVueFlow } from "@vue-flow/core";
import type { GraphNode } from "@vue-flow/core";
import { computed, ref } from "vue";
import AltSelectorGroup from "./AltSelectorGroup.vue";

const vueFlow = useVueFlow();

const sidebar = ref({ visibile: false, position: "right" });
const activeAccordion: Array<number> = [];

const altReqGroups = computed(() => {
  return vueFlow.getNodes.value
    .filter((node: GraphNode<ICourseNodeData>) => node.data.altReqs.length > 0)
    .map((node: GraphNode<ICourseNodeData>) => {
      return {
        targetID: node.id,
        listings: new DetailedCoreq(+node.id, node.data.courses).getListingsString(),
        reqs: node.data.altReqs,
      };
    })
    .sort((a, b) => a.listings.localeCompare(b.listings));
});

const sidebarPositionIcon = computed(() => {
  return sidebar.value.position === "right" ? "pi pi-step-backward" : "pi pi-step-forward";
});
function toggleSidebarPosition() {
  sidebar.value.position = sidebar.value.position === "right" ? "full" : "right";
}
function toggleSidebarVisible() {
  sidebar.value.visibile = !sidebar.value.visibile;
}
</script>

<template>
  <PrimeButton type="button" label="Alts" @click="toggleSidebarVisible" style="position: fixed; top: 33%; right: 0" />
  <PrimeSidebar v-model:visible="sidebar.visibile" :position="sidebar.position" :modal="false" class="p-sidebar-third">
    <template #header>
      <PrimeButton
        :icon="sidebarPositionIcon"
        class="p-sidebar-close p-sidebar-icon p-link flex align-items-center justify-content-center"
        @click="toggleSidebarPosition"
      />
      <h3 class="flex align-items-center justify-content-center flex-grow-1">Alternative Requirements</h3>
    </template>
    <PrimeAccordion :multiple="true" :active-index="activeAccordion">
      <PrimeAccordionTab v-for="altReqGroup in altReqGroups" :header="altReqGroup.listings">
        <AltSelectorGroup :altReqGroup="altReqGroup" />
      </PrimeAccordionTab>
    </PrimeAccordion>
  </PrimeSidebar>
</template>

<style>
.p-sidebar-header {
  justify-content: space-between !important;
}
.p-sidebar-header-content {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  flex-grow: 1 !important;
}
.p-sidebar-right .p-sidebar-third {
  width: 30rem !important;
}
</style>
