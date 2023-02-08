import { markRaw, ref, type Ref } from "vue";
import { defineStore } from "pinia";
import {
  useVueFlow,
  type EdgeComponent,
  type EdgeTypesObject,
  type NodeComponent,
  type NodeTypesObject,
} from "@vue-flow/core";
import { getCourseFor } from "@/services/CourseDataService";
import type { CourseDTO } from "@/services/CourseDataService";
import { Layout } from "@/utils/LayoutUtility";
import type { CustomNode } from "@/classes/CustomNode";
import { getFlowFor } from "@/services/FlowDataService";
import CourseNode from "@/components/CourseFlow/CourseNode.vue";
import CourseEdge from "@/components/CourseFlow/CourseEdge.vue";
import type { CustomEdge } from "@/classes/CustomEdge";

export const useCourseFlow = defineStore("CourseFlow", () => {
  const {
    edges,
    nodes,
    getNodes,
    getEdges,
    getNodesInitialized,
    fitView,
    findNode,
    findEdge,
    addNodes,
    addEdges,
    removeNodes,
  } = useVueFlow({ id: "course-flow" });

  const vueFlow = useVueFlow({ id: "course-flow" });

  const nodeTypes: NodeTypesObject = {
    course: markRaw(CourseNode) as NodeComponent,
  };
  const edgeTypes: EdgeTypesObject = {
    course: markRaw(CourseEdge) as EdgeComponent,
  };

  const input = ref({ subj: "", num: "" });
  const searchResult: Ref<CourseDTO | undefined> = ref();
  const isNew = ref(true);
  const layout = new Layout();
  layout.autoLayout();

  function clear() {
    edges.value = [];
    nodes.value = [];
  }

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
      const existingNode = findNode(newNode.id);
      if (existingNode) {
        existingNode.data.manual = existingNode.data.manual ? existingNode.data.manual : newNode.data.manual;
        existingNode.data.hidden = existingNode.data.hidden ? newNode.data.hidden : existingNode.data.hidden;
      } else {
        uniqueNodes.push(newNode);
      }
    });
    addNodes(uniqueNodes);
  }

  function addInputToFlow() {
    getFlowFor(input.value.subj, +input.value.num).then((flow) => {
      if (flow) {
        postNodes(flow.nodes);
        addEdges(flow.edges);
        layout.autoLayout();
      }
    });
  }

  return {
    nodeTypes,
    edgeTypes,
    input,
    searchResult,
    isNew,
    layout,
    getNodes,
    getEdges,
    getNodesInitialized,
    vueFlow,
    fitView,
    findNode,
    retrieveCourse,
    addInputToFlow,
    findEdge,
    removeNodes,
    clear,
  };
});
