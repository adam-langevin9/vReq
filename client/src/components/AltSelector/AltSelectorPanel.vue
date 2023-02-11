<script setup lang="ts">
import { computed, ref, watch, type Ref } from "vue";
import AltSelectorGroup from "./AltSelectorGroup.vue";
import { useAltSelector } from "@/stores/AltSelectorStore";
import { useCourseFlow } from "@/stores/CourseFlowStore";
import type { CustomEdgeData } from "@/classes/CustomEdge";
import type { GraphEdge } from "@vue-flow/core";
import { getSelectedListings } from "@/classes/CustomNode";

type Headers = {
  targetID: string;
  disabled: boolean;
  active: boolean;
}[];

const altSelector = useAltSelector();
const courseFlow = useCourseFlow();

const activeAccordion: Ref<Array<number>> = ref([]);

const allAltReqs = computed(() =>
  (courseFlow.getEdges as GraphEdge<CustomEdgeData, any>[]).filter((edge) => edge.data.altCombo)
);
const altReqTargetIDs = computed(() =>
  Array.from(new Set(allAltReqs.value.map((altReq) => altReq.target))).sort((a, b) =>
    getSelectedListings(courseFlow.findNode(a)!).localeCompare(getSelectedListings(courseFlow.findNode(b)!))
  )
);
const altReqHeaders = computed(() =>
  altReqTargetIDs.value.map((targetID, idx) => {
    return {
      targetID,
      disabled: courseFlow.getEdges
        .filter((edge) => edge.target === targetID)!
        .every((edge) => (edge.targetNode.data as CustomEdgeData).hidden),
      active: activeAccordion.value.includes(idx),
    };
  })
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

const shouldUpdateHeaders = (oldHeaders: Headers, newHeaders: Headers) => {
  if (oldHeaders.length !== newHeaders.length) {
    return true;
  }
  for (var idx = 0; idx < oldHeaders.length; idx++) {
    if (oldHeaders[idx].disabled !== newHeaders[idx].disabled) {
      return true;
    }
    if (oldHeaders[idx].targetID !== newHeaders[idx].targetID) {
      return true;
    }
    return false;
  }
};

watch(altReqHeaders, (newHeaders, oldHeaders) => {
  if (shouldUpdateHeaders(oldHeaders, newHeaders)) {
    const oldActiveTransposed = newHeaders.map(
      (newHeader) => oldHeaders.find((oldHeader) => oldHeader.targetID === newHeader.targetID)?.active ?? false
    );
    const newAbled = newHeaders.map((header) => !header.disabled);
    const newActive = oldActiveTransposed.map((active, idx) => active && newAbled[idx]);
    activeAccordion.value = newActive.map((active, idx) => (active ? idx : -1)).filter((idx) => idx !== -1);
  }
});
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
    <PrimeAccordion v-model:active-index="activeAccordion" :multiple="true">
      <PrimeAccordionTab
        v-for="(header, index) in altReqHeaders"
        :key="index"
        :header="getSelectedListings(courseFlow.findNode(header.targetID)!)"
        :disabled="header.disabled"
      >
        <AltSelectorGroup :altReqs="getAltReqsFor(header.targetID)" />
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
