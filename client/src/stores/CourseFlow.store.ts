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
import type { CustomNode, CustomNodeData } from "@/classes/CustomNode";
import CoreqNode from "@/components/Flow/Components/Nodes/CoreqNode/CoreqNode.vue";
import DegreeNode from "@/components/Flow/Components/Nodes/DegreeNode.vue";
import CoreqEdge from "@/components/Flow/Components/Edges/CoreqEdge.vue";
import DegreeEdge from "@/components/Flow/Components/Edges/DegreeEdge.vue";
import type { CustomEdge, CustomEdgeData } from "@/classes/CustomEdge";
import type { CourseDataDTO } from "@/services/FlowDataService";
import { useVisual } from "./Visual.store";
import { invoke, until, useCounter } from "@vueuse/core";

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
    addNodes: _addNodes,
    addEdges: _addEdges,
    removeNodes,
    toObject,
  } = useVueFlow({ id: "course-flow", edgeTypes, nodeTypes });

  // state
  const layout = ref();

  // computed
  // Add types to getEdges and getNodes to make stricter typing
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
  const getManualNodes: ComputedRef<GraphNode<CustomNodeData, any>[]> = computed(() =>
    getNodes.value.filter((node) => node.data.manual)
  );
  // actions

  function load(courseFlow: string): void;
  function load(courseFlow: FlowExportObject): void;
  function load(courseFlow: string | FlowExportObject): void {
    if (typeof courseFlow === "string") courseFlow = JSON.parse(courseFlow) as FlowExportObject;
    const [x = 0, y = 0] = courseFlow.position;
    setNodes(courseFlow.nodes);
    setEdges(courseFlow.edges);
    setTransform({ x, y, zoom: courseFlow.zoom || 1 });
    fitView();
  }
  function newNodes(nodes: CustomNode[]): CustomNode[] {
    return nodes.filter((node) => !findNode(node.id));
  }

  function newEdges(edges: CustomEdge[]): CustomEdge[] {
    return edges.filter((edge) => !findEdge(edge.id));
  }
  function addNodes(nodes: CustomNode[], shouldAutoLayout: boolean = true) {
    if (shouldAutoLayout && newNodes(nodes).length > 0) {
      const nodeCount = getNodesInitialized.value.length + newNodes(nodes).length;
      const unwatch = watch(
        () => getNodesInitialized.value.length,
        () => autoLayout()
      );
      _addNodes(nodes);
      invoke(async () => {
        await until(getNodesInitialized).toMatch((nodes) => nodes.length === nodeCount);
        unwatch();
      });
    } else {
      _addNodes(nodes);
    }
  }
  function addEdges(edges: CustomEdge[], shouldAutoLayout: boolean = true): void {
    if (shouldAutoLayout && newEdges(edges).length > 0) {
      const edgeCount = getEdges.value.length + newEdges(edges).length;
      const unwatch = watch(
        () => getEdges.value.length,
        () => autoLayout()
      );
      _addEdges(edges);
      invoke(async () => {
        await until(getEdges).toMatch((edges) => edges.length === edgeCount);
        unwatch();
      });
    } else _addEdges(edges);
  }

  function fitView(options?: FitViewParams): void {
    return _fitView({
      nodes: getVisibleNodes.value.map((node) => node.id),
      duration: 200,
      ...options,
    });
  }
  function autoLayout(): void {
    layout.value = new Layout();
    layout.value.autoLayout();
  }

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
    getManualNodes,
    newNodes,
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
    autoLayout,
  };
});
