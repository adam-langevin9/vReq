<script setup lang="ts">
import type { ICustomNodeData } from "@/classes/Nodes/Node";
import { useCourseFlow } from "@/stores/CourseFlowStore";
import type { GraphNode } from "@vue-flow/core";
import { computed, ref } from "vue";

const courseFlowStore = useCourseFlow();

const sidebar = ref({ visibile: false, position: "right" });
const activeAccordion = ref([]);

const sidebarPositionIcon = computed(() => {
  return sidebar.value.position === "right" ? "pi pi-step-backward" : "pi pi-step-forward";
});

const altReqGroups = computed(() => {
  return courseFlowStore.vueFlowStore.nodes
    .filter((node: GraphNode<ICustomNodeData>) => node.data.altReqs.length > 0)
    .map((node: GraphNode<ICustomNodeData>) => {
      return {
        listings: node.data.listings
          .slice(0, -1)
          .reduce((acc, curr) => acc.concat(curr.toString()).concat(" / "), "")
          .concat(node.data.listings[node.data.listings.length - 1].toString()),
        reqs: node.data.altReqs,
      };
    })
    .sort((a, b) => a.listings.localeCompare(b.listings));
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
        <div v-for="reqIdx in altReqGroup.reqs.length">
          <PrimeDivider v-if="reqIdx > 1" />
          <div class="flex justify-content-center align-items-center">
            <h3>Requirment {{ reqIdx }}</h3>
          </div>
          <div class="flex justify-content-center align-items-start flex-wrap">
            <div
              v-for="optIdx in altReqGroup.reqs[reqIdx - 1].opts.length"
              class="flex flex-column justify-content-center align-items-center px-7 py-3"
            >
              <PrimeRadioButton
                :name="'req'.concat(reqIdx.toString())"
                :inputId="'opt'.concat(optIdx.toString())"
                :value="altReqGroup.reqs[reqIdx - 1].opts[optIdx - 1]"
                v-model="altReqGroup.reqs[reqIdx - 1].selectedOpt"
                class="align-items-center"
              />
              <label
                :for="'opt'.concat(optIdx.toString())"
                class="flex flex-column justify-content-center align-items-center"
              >
                <div
                  v-for="element in altReqGroup.reqs[reqIdx - 1].opts[optIdx - 1]"
                  class="flex flex-column justify-content-center align-items-center"
                >
                  {{ element.getListingsString() }}
                </div>
              </label>
            </div>
          </div>
        </div>
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
