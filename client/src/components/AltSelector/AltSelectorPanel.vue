<script setup lang="ts">
import type { CustomNodeData } from "@/classes/CustomNode";
import { useVueFlow } from "@vue-flow/core";
import type { GraphNode } from "@vue-flow/core";
import { computed, ref, type Ref } from "vue";
import AltSelectorGroup from "./AltSelectorGroup.vue";
import { useAltSelector } from "@/stores/AltSelectorStore";

const vueFlow = useVueFlow();
const altSelector = useAltSelector();

const activeAccordion: Ref<number | undefined> = ref(undefined);

const altReqGroups = computed(() => {
  return vueFlow.getNodes.value
    .filter((node: GraphNode<CustomNodeData>) => node.data.altReqs.length > 0)
    .filter((node: GraphNode<CustomNodeData>) => !node.data.hidden)
    .map((node: GraphNode<CustomNodeData>) => {
      return {
        targetID: node.id,
        listings: [],
        reqs: node.data.altReqs,
      };
    });
  //.sort((a, b) => a.listings.localeCompare(b.listings));
});

const sidebarPositionIcon = computed(() => {
  return altSelector.position === "right" ? "pi pi-step-backward" : "pi pi-step-forward";
});
function toggleSidebarPosition() {
  altSelector.position = altSelector.position === "right" ? "full" : "right";
}
function toggleSidebarVisible() {
  altSelector.visible = !altSelector.visible;
}
</script>

<template>
  <PrimeButton
    type="button"
    label="Alternative Requirements"
    icon="pi pi-step-backward"
    @click="toggleSidebarVisible"
    class="alt-req-btn"
  />
  <PrimeSidebar
    v-model:visible="altSelector.visible"
    :position="altSelector.position"
    :modal="false"
    :dismissable="false"
    class="p-sidebar-third"
  >
    <template #header>
      <PrimeButton
        :icon="sidebarPositionIcon"
        class="p-sidebar-close p-sidebar-icon p-link flex align-items-center justify-content-center"
        @click="toggleSidebarPosition"
      />
      <h3 class="flex align-items-center justify-content-center flex-grow-1">Alternative Requirements</h3>
    </template>
    <PrimeAccordion :active-index="activeAccordion">
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

.alt-req-btn {
  transition: right 1s ease-in-out !important;
  position: fixed !important;
  top: 25%;
  right: -220px;
}
.alt-req-btn:hover {
  transition: right 1s ease-in-out;
  right: 0px;
}
.p-button .p-button-icon-left {
  margin-right: 2rem !important;
}
</style>
