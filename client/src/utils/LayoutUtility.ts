import { useVueFlow, Position, type VueFlowStore } from "@vue-flow/core";
import dagre from "dagre";
import { watch } from "vue";

export class Layout {
  dagreGraph: dagre.graphlib.Graph<{}>;
  vueFlow: VueFlowStore;
  direction: string;

  constructor(direction: string = "LR") {
    this.dagreGraph = new dagre.graphlib.Graph();
    this.dagreGraph.setDefaultEdgeLabel(() => ({}));
    this.vueFlow = useVueFlow({ id: "course-flow" });
    this.direction = direction;
    watch(
      [
        this.vueFlow.getNodesInitialized,
        this.vueFlow.getEdges,
        () => this.vueFlow.getNodesInitialized.value.length,
        () => this.vueFlow.getEdges.value.length,
      ],
      () => {
        this.autoLayout();
      }
    );
  }

  autoLayout = () => {
    const isVertical = this.direction === "TB";
    this.dagreGraph.setGraph({ rankdir: this.direction });

    this.vueFlow.getNodesInitialized.value.forEach((elm) => {
      this.dagreGraph.setNode(elm.id, { width: elm.dimensions.width, height: elm.dimensions.height });
    });

    this.vueFlow.getEdges.value.forEach((edge) => {
      this.dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(this.dagreGraph);

    this.vueFlow.getNodesInitialized.value.forEach((elm) => {
      const nodeWithPosition = this.dagreGraph.node(elm.id);
      const hasPredecessors = this.dagreGraph.predecessors(elm.id)?.length;
      elm.targetPosition = isVertical ? Position.Left : Position.Top;
      elm.sourcePosition = isVertical ? Position.Right : Position.Bottom;
      elm.position = { x: nodeWithPosition.x, y: nodeWithPosition.y };
      elm.data = { ...elm.data, hasPredecessors };
      elm.style = {
        opacity: 1,
      };
    });

    this.vueFlow.fitView();
  };
}
