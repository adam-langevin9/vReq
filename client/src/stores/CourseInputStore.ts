import { ref, watch, type Ref } from "vue";
import { defineStore } from "pinia";
import { Position, useVueFlow } from "@vue-flow/core";
import { getDetailedCoreqFor } from "@/services/api/CoreqDataService";
import { getCourseFor } from "@/services/api/CourseDataService";
import { NodeFactory } from "@/services/NodeService";
import type { AltReqGroup } from "@/classes/AltReqGroup";
import type { DetailedCourse } from "@/classes/Course";
import { useLayout } from "@/utils/LayoutUtility";

export const useCourseInput = defineStore("CourseInput", () => {
  const vueFlow = useVueFlow();
  useLayout();
  const input = ref({ subj: "", num: "" });
  const searchResult: Ref<DetailedCourse | undefined> = ref();
  const isNew = ref(true);
  const altsReqs: Ref<Array<AltReqGroup>> = ref([]);

  function retrieveCourse() {
    if (isNew.value) {
      isNew.value = false;
    }
    getCourseFor(input.value.subj, +input.value.num).then((course) => {
      searchResult.value = course;
    });
  }

  function addInputToFlow() {
    getDetailedCoreqFor(input.value.subj, +input.value.num)
      .then((detailedCoreq) => {
        if (detailedCoreq) {
          const { nodes, edges } = NodeFactory.createNodes(detailedCoreq);
          vueFlow.addNodes(
            nodes.filter((newNode) => !vueFlow.nodes.value.map((oldNode) => oldNode.id).includes(newNode.id))
          );
          vueFlow.addEdges(edges);
        } else {
        }
      })
      .catch((_e) => {});
  }

  return {
    input,
    searchResult,
    isNew,
    altsReqs,
    vueFlow,
    retrieveCourse,
    addInputToFlow,
  };
});
