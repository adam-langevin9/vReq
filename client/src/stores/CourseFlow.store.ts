import { markRaw, ref, watch, type ComputedRef, type Ref } from "vue";
import { defineStore } from "pinia";
import {
  useVueFlow,
  type EdgeComponent,
  type EdgeTypesObject,
  type GraphEdge,
  type GraphNode,
  type NodeComponent,
  type NodeTypesObject,
} from "@vue-flow/core";
import { getCourseFor } from "@/services/CourseDataService";
import type { CourseDTO } from "@/services/CourseDataService";
import { Layout } from "@/utils/LayoutUtility";
import type { CustomNode, CustomNodeData } from "@/classes/CustomNode";
import { getCoreqFlow, getDegreeFlow, type CourseDataDTO } from "@/services/FlowDataService";
import CoreqNode from "@/components/Flow/Components/Nodes/CoreqNode/CoreqNode.vue";
import DegreeNode from "@/components/Flow/Components/Nodes/DegreeNode.vue";
import CoreqEdge from "@/components/Flow/Components/Edges/CoreqEdge.vue";
import DegreeEdge from "@/components/Flow/Components/Edges/DegreeEdge.vue";
import type { CustomEdgeData } from "@/classes/CustomEdge";

export const useCourseFlow = defineStore("CourseFlow", () => {
  const nodeTypes: NodeTypesObject = {
    coreq: markRaw(CoreqNode) as NodeComponent,
    degree: markRaw(DegreeNode) as NodeComponent,
  };
  const edgeTypes: EdgeTypesObject = {
    coreq: markRaw(CoreqEdge) as EdgeComponent,
    degree: markRaw(DegreeEdge) as EdgeComponent,
  };
  const {
    edges,
    nodes,
    getNodes: _getNodes,
    getEdges: _getEdges,
    getNodesInitialized,
    setNodes,
    setEdges,
    setTransform,
    fitView,
    findNode,
    findEdge,
    addNodes,
    addEdges,
    removeNodes,
    toObject,
  } = useVueFlow({ id: "course-flow", edgeTypes, nodeTypes });
  const getEdges: ComputedRef<Array<GraphEdge<CustomEdgeData, any>>> = _getEdges;
  const getNodes: ComputedRef<Array<GraphNode<CustomNodeData, any>>> = _getNodes;

  const storedFlow = localStorage.getItem("flow");
  if (storedFlow) {
    const flow = JSON.parse(storedFlow);
    const [x = 0, y = 0] = flow.position;
    setNodes(flow.nodes);
    setEdges(flow.edges);
    setTransform({ x, y, zoom: flow.zoom || 0 });
  }
  watch(
    () => toObject(),
    (flow) => {
      localStorage.setItem("flow", JSON.stringify(flow));
    },
    { deep: true }
  );

  const startYear = ref(new Date().getFullYear());
  const input = ref({ subj: "", num: "" });
  const searchResult: Ref<CourseDTO | undefined> = ref();
  const isNew = ref(true);
  const isLoadingFlow = ref(false);
  const layout = new Layout();
  layout.autoLayout();

  function searchLoaded(course: CourseDataDTO): void {
    if (isNew.value) {
      isNew.value = false;
    }
    input.value = {
      subj: course.listings[course.selectedListing].subj,
      num: course.listings[course.selectedListing].num.toString(),
    };
    searchResult.value = { title: course.title, hours: course.hours, descr: course.descr };
  }

  async function retrieveCourse(): Promise<void> {
    if (isNew.value) {
      isNew.value = false;
    }
    searchResult.value = await getCourseFor(input.value.subj, +input.value.num);
  }

  function postNodes(newNodes: CustomNode[]): void {
    const uniqueNodes: CustomNode[] = [];
    newNodes.forEach((newNode) => {
      const existingNode = findNode(newNode.id);
      if (existingNode && "courses" in newNode.data) {
        existingNode.data.manual = existingNode.data.manual ? existingNode.data.manual : newNode.data.manual;
        existingNode.data.hidden = existingNode.data.hidden ? newNode.data.hidden : existingNode.data.hidden;
      } else {
        uniqueNodes.push(newNode);
      }
    });
    addNodes(uniqueNodes);
  }

  async function addInputToFlow(): Promise<void> {
    isLoadingFlow.value = true;
    const flow = await getCoreqFlow(input.value.subj, +input.value.num);
    if (flow) {
      postNodes(flow.nodes);
      addEdges(flow.edges);
      layout.autoLayout();
    }
    isLoadingFlow.value = false;
  }

  async function addDegreeToFlow(id: number): Promise<void> {
    isLoadingFlow.value = true;
    const flow = await getDegreeFlow(id);
    if (flow) {
      postNodes(flow.nodes);
      addEdges(flow.edges);
      layout.autoLayout();
    }
    isLoadingFlow.value = false;
  }

  function clear(): void {
    edges.value = [];
    nodes.value = [];
  }

  return {
    nodeTypes,
    edgeTypes,
    startYear,
    input,
    searchResult,
    isNew,
    isLoadingFlow,
    layout,
    getNodes,
    getEdges,
    getNodesInitialized,
    searchLoaded,
    fitView,
    findNode,
    retrieveCourse,
    addInputToFlow,
    addDegreeToFlow,
    findEdge,
    removeNodes,
    clear,
    toObject,
  };
});
