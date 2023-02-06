import { MarkerType, Position } from "@vue-flow/core";
import type { DefaultEdge } from "@vue-flow/core";
import type { EdgeDTO } from "@/services/FlowDataService";

export type CustomEdgeData = {
  hidden: boolean;
  selected: boolean;
};

export interface ICustomEdge extends DefaultEdge<CustomEdgeData> {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  markerEnd: string;
  selectable: boolean;
  data: CustomEdgeData;
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
  data: CustomEdgeData;
  type: string = "course";
  sourcePostion: Position = Position.Right;
  targetPosition: Position = Position.Left;

  static createEdgeID(source_id: string, target_id: string): string;
  static createEdgeID(source_id: number, target_id: number): string;
  static createEdgeID(source_id: number | string, target_id: number | string): string {
    return source_id.toString().concat("-").concat(target_id.toString());
  }
  constructor(edgeDTO: EdgeDTO) {
    this.id = CustomEdge.createEdgeID(edgeDTO.source, edgeDTO.target);
    this.source = edgeDTO.source.toString();
    this.target = edgeDTO.target.toString();
    this.animated = edgeDTO.animated;
    this.data = { hidden: false, selected: true };
  }
}
