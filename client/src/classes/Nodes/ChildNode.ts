import type { DetailedCoreq } from "@/classes/Coreq";
import { CustomNode } from "@/classes/Nodes/Node";

export class ChildNode extends CustomNode {
  static readonly type = "child";
  static readonly width = "175px";
  static readonly height = "45px";
  static readonly connectable = false;
  static readonly draggable = false;

  readonly parentNode: string;
  readonly extent = "parent";

  constructor(
    idx: number,
    detailedCoreq: DetailedCoreq,
    is_manual: boolean = true,
    hidden: boolean = false,
    is_complete: boolean = false
  ) {
    super(
      detailedCoreq.courses[idx].id.toString(),
      { x: 5, y: 5 + 50 * idx },
      { ...detailedCoreq.courses[idx], is_manual, is_complete, altReqs: [] },
      ChildNode.type,
      ChildNode.width,
      ChildNode.height,
      ChildNode.draggable,
      false,
      hidden
    );
    this.parentNode = detailedCoreq.id.toString();
  }
}
