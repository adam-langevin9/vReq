import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { useVueFlow } from "@vue-flow/core";
import { getDetailedCoreqFor } from "@/services/api/CoreqDataService";
import { getCourseFor } from "@/services/api/CourseDataService";
import { NodeFactory } from "@/services/NodeService";
import type { AltReqGroup } from "@/classes/AltReqGroup";
import type { DetailedCourse } from "@/classes/Course";
import { useLayout } from "@/utils/LayoutUtility";
import type { CustomNode } from "@/classes/Node";

export const useCourseFlow = defineStore("CourseFlow", () => {
  const vueFlow = useVueFlow();
  useLayout();
  const input = ref({ subj: "", num: "" });
  const searchResult: Ref<DetailedCourse | undefined> = ref();
  const isNew = ref(true);
  const altsReqs: Ref<Array<AltReqGroup>> = ref([]);

  const allNodesVisibility = ref(false);

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
    getDetailedCoreqFor(input.value.subj, +input.value.num)
      .then((detailedCoreq) => {
        if (detailedCoreq) {
          const { nodes, edges } = NodeFactory.createNodes(detailedCoreq);
          postNodes(nodes);
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
    allNodesVisibility,
    retrieveCourse,
    addInputToFlow,
  };
});
