import { computed, markRaw, ref, watch, type ComputedRef } from "vue";
import { defineStore } from "pinia";
import {
  useVueFlow,
  type EdgeComponent,
  type EdgeTypesObject,
  type FlowExportObject,
  type GraphEdge,
  type GraphNode,
  type NodeComponent,
  type NodeTypesObject,
  type FitViewParams,
} from "@vue-flow/core";
import { Layout } from "@/utils/LayoutUtility";
import type { CustomNodeData } from "@/classes/CustomNode";
import CoreqNode from "@/components/Flow/Components/Nodes/CoreqNode/CoreqNode.vue";
import DegreeNode from "@/components/Flow/Components/Nodes/DegreeNode.vue";
import CoreqEdge from "@/components/Flow/Components/Edges/CoreqEdge.vue";
import DegreeEdge from "@/components/Flow/Components/Edges/DegreeEdge.vue";
import type { CustomEdgeData } from "@/classes/CustomEdge";
import type { CourseDataDTO } from "@/services/FlowDataService";
import { useVisual } from "./Visual.store";

export const useCourseFlow = defineStore("CourseFlow", () => {
  // stores
  const visual = useVisual();

  // node and edge types are needed for vueFlow store
  const nodeTypes: NodeTypesObject = {
    coreq: markRaw(CoreqNode) as NodeComponent,
    degree: markRaw(DegreeNode) as NodeComponent,
  };
  const edgeTypes: EdgeTypesObject = {
    coreq: markRaw(CoreqEdge) as EdgeComponent,
    degree: markRaw(DegreeEdge) as EdgeComponent,
  };
  const {
    getNodesInitialized,
    getNodes: _getNodes,
    getEdges: _getEdges,
    nodesDraggable: _nodesDraggable,
    nodesConnectable: _nodesConnectable,
    elementsSelectable: _elementsSelectable,
    zoomOnScroll: _zoomOnScroll,
    zoomOnDoubleClick: _zoomOnDoubleClick,
    zoomOnPinch: _zoomOnPinch,
    panOnScroll: _panOnScroll,
    panOnDrag: _panOnDrag,
    setNodes,
    setEdges,
    setTransform,
    fitView: _fitView,
    zoomIn,
    zoomOut,
    findNode,
    findEdge,
    addNodes,
    addEdges,
    removeNodes,
    toObject,
  } = useVueFlow({ id: "course-flow", edgeTypes, nodeTypes });
  // Add types to getEdges and getNodes to make stricter typing

  // state
  const layout = ref();

  // computed
  const getEdges: ComputedRef<GraphEdge<CustomEdgeData, any>[]> = _getEdges;
  const getNodes: ComputedRef<GraphNode<CustomNodeData, any>[]> = _getNodes;
  const getVisibleNodes: ComputedRef<GraphNode<CustomNodeData, any>[]> = computed(() =>
    getNodesInitialized.value.filter((node) => !node.data.hidden)
  );
  const getVisibleSelectedListings: ComputedRef<{ listing: string; title: string; descr: string; hours: string }[]> =
    computed(() =>
      getVisibleNodes.value
        .filter((node: GraphNode) => node.data?.courses?.length)
        .map((node: GraphNode) => {
          return node.data.courses.map((course: CourseDataDTO) => {
            return {
              listing: course.listings[course.selectedListing].subj
                .concat(" ")
                .concat(course.listings[course.selectedListing].num.toString()),
              title: course.title,
              descr: course.descr,
              hours: course.hours,
            };
          });
        })
        .reduce((acc: any[], val: any) => acc.concat(val), [])
        .sort((a: { listing: string }, b: { listing: string }) => a.listing.localeCompare(b.listing))
    );

  // actions
  function fitView(options?: FitViewParams): void {
    return _fitView({
      nodes: getVisibleNodes.value.map((node) => node.id),
      duration: 200,
      ...options,
    });
  }
  function load(courseFlow: string): void;
  function load(courseFlow: FlowExportObject): void;
  function load(courseFlow: string | FlowExportObject): void {
    if (typeof courseFlow === "string") courseFlow = JSON.parse(courseFlow) as FlowExportObject;
    const [x = 0, y = 0] = courseFlow.position;
    setNodes(courseFlow.nodes);
    setEdges(courseFlow.edges);
    setTransform({ x, y, zoom: courseFlow.zoom || 1 });
    setTimeout(() => (visual.isUpToDate = true));
  }

  // watchers
  watch([getNodesInitialized, getEdges, () => getNodesInitialized.value.length, () => getEdges.value.length], () => {
    layout.value = new Layout();
    layout.value.autoLayout();
  });

  // local storage
  const storedCourseFlow = localStorage.getItem("course-flow");
  if (storedCourseFlow) load(storedCourseFlow);
  watch(
    toObject,
    (flow) => {
      localStorage.setItem("course-flow", JSON.stringify(flow));
    },
    { deep: true }
  );

  return {
    nodeTypes,
    edgeTypes,
    layout,
    getNodes,
    getEdges,
    getNodesInitialized,
    getVisibleNodes,
    getVisibleSelectedListings,
    addNodes,
    addEdges,
    setNodes,
    setEdges,
    setTransform,
    fitView,
    zoomIn,
    zoomOut,
    findNode,
    findEdge,
    removeNodes,
    toObject,
    load,
  };
});
