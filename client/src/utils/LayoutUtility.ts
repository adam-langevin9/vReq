import { useVueFlow, Position } from "@vue-flow/core";
import dagre from "dagre";
import { watch } from "vue";

export function useLayout() {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const { getEdges, getNodesInitialized, fitView } = useVueFlow();

  const onLayout = (direction: string) => {
    const isVertical = direction === "TB";
    dagreGraph.setGraph({ rankdir: direction });

    getNodesInitialized.value.forEach((elm) => {
      dagreGraph.setNode(elm.id, { width: elm.dimensions.width, height: elm.dimensions.height });
    });

    getEdges.value.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    getNodesInitialized.value.forEach((elm) => {
      const nodeWithPosition = dagreGraph.node(elm.id);
      const hasPredecessors = dagreGraph.predecessors(elm.id)?.length;
      elm.targetPosition = isVertical ? Position.Left : Position.Top;
      elm.sourcePosition = isVertical ? Position.Right : Position.Bottom;
      elm.position = { x: nodeWithPosition.x, y: nodeWithPosition.y };
      elm.data = { ...elm.data, hasPredecessors };
      elm.style = {
        opacity: 1,
      };
    });

    fitView();
  };

  watch([getNodesInitialized, getEdges, () => getNodesInitialized.value.length, () => getEdges.value.length], () => {
    onLayout("LR");
  });
}
