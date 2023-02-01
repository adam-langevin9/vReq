import { MarkerType, Position, type EdgeComponent, type ElementData } from "@vue-flow/core";
import type { DefaultEdge } from "@vue-flow/core";
import { type Req, REQ } from "@/classes/Req";

export interface ICustomEdgeData {
  hidden: boolean;
  selected: boolean;
}

export interface ICustomEdge extends DefaultEdge<ICustomEdgeData> {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  markerEnd: string;
  selectable: boolean;
  data: ICustomEdgeData;
  sourcePostion: Position;
  targetPosition: Position;
}

export class CustomEdge implements ICustomEdge {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  markerEnd: string = MarkerType.Arrow;
  selectable: boolean = false;
  data: ICustomEdgeData;
  type: string = "course";
  sourcePostion: Position = Position.Right;
  targetPosition: Position = Position.Left;

  static createEdgeID(source_id: string, target_id: string): string {
    return source_id.toString().concat("-").concat(target_id.toString());
  }
  constructor(source: string, target: string, req: Req, hidden: boolean, selected: boolean) {
    this.id = CustomEdge.createEdgeID(source, target);
    this.source = source;
    this.target = target;
    this.animated = req === REQ.precoreq;
    this.data = { hidden, selected };
  }
}
