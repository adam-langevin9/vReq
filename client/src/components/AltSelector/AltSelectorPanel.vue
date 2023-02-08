<script setup lang="ts">
import { computed, ref, watchEffect, type Ref } from "vue";
import AltSelectorGroup from "./AltSelectorGroup.vue";
import { useAltSelector } from "@/stores/AltSelectorStore";
import { useCourseFlow } from "@/stores/CourseFlowStore";
import type { CustomEdgeData } from "@/classes/CustomEdge";
import type { GraphEdge } from "@vue-flow/core";
import { getListings } from "@/classes/CustomNode";

const altSelector = useAltSelector();
const courseFlow = useCourseFlow();

const activeAccordion: Ref<number | undefined> = ref(undefined);

const allAltReqs = computed(() =>
  (courseFlow.getEdges as GraphEdge<CustomEdgeData, any>[]).filter((edge) => edge.data.altCombo)
);
const altReqTargetIDs = computed(() =>
  Array.from(new Set(allAltReqs.value.map((altReq) => altReq.target))).sort((a, b) =>
    getListings(courseFlow.findNode(a)!).localeCompare(getListings(courseFlow.findNode(b)!))
  )
);
const sidebarPositionIcon = computed(() =>
  altSelector.position === "right" ? "pi pi-step-backward" : "pi pi-step-forward"
);
const toggleSidebarPosition = () => {
  altSelector.position = altSelector.position === "right" ? "full" : "right";
};
const toggleSidebarVisible = () => {
  altSelector.visible = !altSelector.visible;
};
const getAltReqsFor = (targetID: string) => allAltReqs.value.filter((altReq) => altReq.target === targetID);
</script>

<script lang="ts">
export default {
  computed: {
    isGroupDisabled(targetID: string) {
      return useCourseFlow().findNode(targetID)?.data.hidden;
    },
  },
  // rest of the component code...
};
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
      <PrimeAccordionTab
        v-for="targetID in altReqTargetIDs"
        :header="getListings(courseFlow.findNode(targetID)!)"
        :disabled="courseFlow.getEdges.filter(edge=>edge.target===targetID)!.every(edge=>(edge.targetNode.data as CustomEdgeData).hidden)"
      >
        <AltSelectorGroup :altReqs="getAltReqsFor(targetID)" />
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
