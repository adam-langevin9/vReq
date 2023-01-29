import type { DetailedCoreq } from "@/classes/Coreq";
import { Position, type XYPosition } from "@vue-flow/core";
import { CustomNode } from "@/classes/Nodes/Node";

export class ParentNode extends CustomNode {
  static readonly type = "default";
  static readonly width = "185px";
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
      ParentNode.type,
      ParentNode.width,
      (50 * detailedCoreq.courses.length + 5).toString().concat("px"),
      ParentNode.draggable,
      true,
      hidden
    );
  }
}
