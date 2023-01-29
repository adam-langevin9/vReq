import { MarkerType, type ElementData } from "@vue-flow/core";
import type { DefaultEdge } from "@vue-flow/core";
import { type Req, REQ } from "@/classes/Req";

type CustomEdgeData = {
  req: Req;
  altID?: number;
};

export interface ICustomEdge extends DefaultEdge<CustomEdgeData> {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  markerEnd: string;
  selectable: boolean;
  hidden: boolean;
  data: CustomEdgeData;
}

export class CustomEdge implements ICustomEdge {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  markerEnd: string = MarkerType.ArrowClosed;
  selectable: boolean = false;
  hidden: boolean;
  data: CustomEdgeData;

  static createEdgeID(source_id: string, target_id: string): string {
    return source_id.toString().concat("-").concat(target_id.toString());
  }
  constructor(source: string, target: string, req: Req, altID?: number, hidden = false) {
    this.id = CustomEdge.createEdgeID(source, target);
    this.source = source;
    this.target = target;
    this.animated = req === REQ.precoreq;
    this.data = { req, altID };
    this.hidden = hidden;
  }
}
