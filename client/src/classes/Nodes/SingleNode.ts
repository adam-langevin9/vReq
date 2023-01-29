import type { DetailedCoreq } from "@/classes/Coreq";
import { Position, type XYPosition } from "@vue-flow/core";
import { CustomNode } from "@/classes/Nodes/Node";

export class SingleNode extends CustomNode {
  static readonly type = "single";
  static readonly width = "175px";
  static readonly height = "45px";
  static readonly connectable = false;
  static readonly draggable = true;

  readonly sourcePosition = Position.Right;
  readonly targetPosition = Position.Left;

  constructor(
    position: XYPosition,
    detailedCoreq: DetailedCoreq,
    is_manual: boolean = true,
    hidden: boolean = false,
    is_complete: boolean = false
  ) {
    super(
      detailedCoreq.id.toString(),
      position,
      { ...detailedCoreq.courses[0], is_manual, is_complete, altReqs: [] },
      SingleNode.type,
      SingleNode.width,
      SingleNode.height,
      SingleNode.draggable,
      true,
      hidden
    );
  }
}
