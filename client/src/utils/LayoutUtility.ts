import { Position } from "@vue-flow/core";
import dagre from "dagre";
import { useCourseFlow } from "@/stores/CourseFlow.store";

export class Layout {
  dagreGraph: dagre.graphlib.Graph<{}>;
  direction: string;
  courseFlow = useCourseFlow();

  constructor(direction: string = "LR") {
    this.dagreGraph = new dagre.graphlib.Graph();
    this.dagreGraph.setDefaultEdgeLabel(() => ({}));
    this.direction = direction;
  }

  autoLayout = (): void => {
    const isVertical = this.direction === "TB";
    this.dagreGraph.setGraph({ rankdir: this.direction });

    this.courseFlow.getNodesInitialized.forEach((elm) => {
      this.dagreGraph.setNode(elm.id, { width: elm.dimensions.width, height: elm.dimensions.height });
    });

    this.courseFlow.getEdges.forEach((edge) => {
      this.dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(this.dagreGraph);

    this.courseFlow.getNodesInitialized.forEach((elm) => {
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

    this.courseFlow.fitView();
  };
}
