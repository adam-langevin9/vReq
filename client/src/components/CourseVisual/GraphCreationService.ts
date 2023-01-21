import type { DetailedCoreqAttributes } from "@/classes/DetailedCoreq";
import type { AddNodes, GraphNode, AddEdges, GraphEdge, Node } from "@vue-flow/core";
import type { Ref } from "vue";
import { ChildNode } from "@/components/CourseVisual/Nodes/ChildNode";
import { SingleNode } from "@/components/CourseVisual/Nodes/SingleNode";
import { ParentNode } from "@/components/CourseVisual/Nodes/ParentNode";
import { createEdgeID, createHardEdge, createSoftEdge } from "./EdgeCreationUtility";
import type { DetailedComboAttributes } from "@/classes/DetailedCombo";

export default class NodeCreationService {
  private readonly addNodes: AddNodes;
  private readonly nodes: Ref<Array<GraphNode<any, any>>>;
  private readonly addEdges: AddEdges;
  private readonly edges: Ref<Array<GraphEdge<any, any>>>;

  constructor(
    nodes: Ref<Array<GraphNode<any, any>>>,
    addNodes: AddNodes,
    edges: Ref<Array<GraphEdge<any, any>>>,
    addEdges: AddEdges
  ) {
    this.addNodes = addNodes;
    this.nodes = nodes;
    this.addEdges = addEdges;
    this.edges = edges;
  }

  private createNode(coreq: DetailedCoreqAttributes): void {
    const newNodes: Node[] = [];
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

  private createEdge(source_id: string, target_id: string, type: "prereq" | "precoreq"): void {
    if (this.edges.value.find((edge) => edge.id === createEdgeID(source_id, target_id).toString())) {
      // Edge is already in Visual
      return;
    }
    if (type === "prereq") {
      this.addEdges([createHardEdge(source_id, target_id)]);
    } else {
      this.addEdges([createSoftEdge(source_id, target_id)]);
    }
  }

  createNodeWAncestors(
    element?: DetailedCoreqAttributes | DetailedComboAttributes,
    target_id?: string,
    req_type?: "prereq" | "precoreq"
  ): void {
    if (element && "id" in element) {
      this.createNode(element);
      if (target_id && req_type) {
        this.createEdge(element.id.toString(), target_id, req_type);
      }
      this.createNodeWAncestors(element.prereq, element.id.toString(), "prereq");
      this.createNodeWAncestors(element.precoreq, element.id.toString(), "precoreq");
    } else {
      if (element && "op" in element) {
        if (element.op === "OR" || element.op === "ONE") {
          this.createNodeWAncestors(element.elements[0], target_id, req_type);
        } else {
          for (const aElement of element.elements) {
            this.createNodeWAncestors(aElement, target_id, req_type);
          }
        }
      }
    }
  }
}
