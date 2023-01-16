import type { DetailedCoreq } from "@/classes/DetailedCoreq";
import type { AddNodes, GraphNode } from "@vue-flow/core";
import type { Ref } from "vue";
import { HardEdge } from "@/components/CourseVisual/Edges/HardEdge";
import { SoftEdge } from "@/components/CourseVisual/Edges/SoftEdge";
import { ChildNode } from "@/components/CourseVisual/Nodes/ChildNode";
import { SingleNode } from "@/components/CourseVisual/Nodes/SingleNode";
import { ParentNode } from "@/components/CourseVisual/Nodes/ParentNode";
import type { Node } from "@vue-flow/core";
import type { DetailedCourse } from "@/classes/DetailedCourse";
import { Listing } from "@/classes/Listing";

export default class NodeCreationService {
  private addNodes: AddNodes;
  private nodes: Ref<GraphNode<any, any>[]>;

  constructor(nodes: Ref<GraphNode<any, any>[]>, addNodes: AddNodes) {
    this.addNodes = addNodes;
    this.nodes = nodes;
  }

  createNode(coreq: DetailedCoreq): void {
    const newNodes: Array<Node> = [];
    if (this.nodes.value.find((node) => node.id === coreq.id.toString())) {
      // Node is already in Visual
      return;
    }
    if (coreq.courses.length === 1) {
      // single node
      newNodes.push(new SingleNode({ x: 0, y: 0 }, coreq));
    } else {
      // nested nodes
      newNodes.push(new ParentNode({ x: 0, y: 0 }, coreq));
      for (let i = 0; i < coreq.courses.length; i++) {
        newNodes.push(new ChildNode(i, coreq));
      }
    }
    this.addNodes(newNodes);
  }
}
