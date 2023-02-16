import type { CustomEdgeData } from "@/classes/CustomEdge";
import { getSelectedName } from "@/classes/CustomNode";
import type { GraphEdge } from "@vue-flow/core";
import { defineStore } from "pinia";
import { type Ref, ref, computed, watch } from "vue";
import { useCourseFlow } from "../CourseFlow.store";

export const useAlternativesMenu = defineStore("AlternativesMenu", () => {
  type Headers = {
    targetID: string;
    disabled: boolean;
    active: boolean;
  }[];

  const courseFlow = useCourseFlow();

  const activeTabs: Ref<Array<number>> = ref([]);

  const allAltReqs = computed(() =>
    (courseFlow.getEdges as GraphEdge<CustomEdgeData, any>[]).filter((edge) => edge.data.altCombo)
  );
  const altReqTargetIDs = computed(() =>
    Array.from(new Set(allAltReqs.value.map((altReq) => altReq.target))).sort((a, b) =>
      getSelectedName(courseFlow.findNode(a)!).localeCompare(getSelectedName(courseFlow.findNode(b)!))
    )
  );
  const altReqHeaders = computed(() =>
    altReqTargetIDs.value.map((targetID, idx) => {
      return {
        targetID,
        disabled: courseFlow.getEdges
          .filter((edge) => edge.target === targetID)!
          .every((edge) => (edge.targetNode.data as CustomEdgeData).hidden),
        active: activeTabs.value.includes(idx),
      };
    })
  );

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
      activeTabs.value = newActive.map((active, idx) => (active ? idx : -1)).filter((idx) => idx !== -1);
    }
  });
  return { activeTabs, altReqHeaders, courseFlow, getSelectedName, getAltReqsFor };
});
