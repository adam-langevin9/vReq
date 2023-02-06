import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { useVueFlow } from "@vue-flow/core";
import { getCourseFor } from "@/services/CourseDataService";
import type { AltReqGroup } from "@/classes/AltReqGroup";
import type { CourseDTO } from "@/services/CourseDataService";
import { Layout } from "@/utils/LayoutUtility";
import type { CustomNode } from "@/classes/CustomNode";
import { getFlowFor } from "@/services/FlowDataService";

export const useCourseFlow = defineStore("CourseFlow", () => {
  const vueFlow = useVueFlow();
  const input = ref({ subj: "", num: "" });
  const searchResult: Ref<CourseDTO | undefined> = ref();
  const isNew = ref(true);
  const altsReqs: Ref<Array<AltReqGroup>> = ref([]);
  const layout = new Layout();
  layout.autoLayout();

  function retrieveCourse() {
    if (isNew.value) {
      isNew.value = false;
    }
    getCourseFor(input.value.subj, +input.value.num).then((course) => {
      searchResult.value = course;
    });
  }

  function postNodes(newNodes: CustomNode[]) {
    const uniqueNodes: CustomNode[] = [];
    newNodes.forEach((newNode) => {
      const existingNode = vueFlow.findNode(newNode.id);
      if (existingNode) {
        existingNode.data.manual = existingNode.data.manual ? existingNode.data.manual : newNode.data.manual;
        existingNode.data.hidden = existingNode.data.hidden ? newNode.data.hidden : existingNode.data.hidden;
      } else {
        uniqueNodes.push(newNode);
      }
    });
    vueFlow.addNodes(uniqueNodes);
  }

  function addInputToFlow() {
    getFlowFor(input.value.subj, +input.value.num).then((flow) => {
      if (flow) {
        postNodes(flow.nodes);
        vueFlow.addEdges(flow.edges);
      }
    });
  }

  return {
    input,
    searchResult,
    isNew,
    altsReqs,
    vueFlow,
    layout,
    retrieveCourse,
    addInputToFlow,
  };
});
