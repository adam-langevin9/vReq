import type { Listing } from "@/classes/Listing";
import { MarkerType, type XYPosition } from "@vue-flow/core";
export class HardEdge {
  readonly id: string;
  readonly source: string;
  readonly target: string;

  readonly markerEnd = MarkerType.ArrowClosed;
  readonly selectable = false;

  constructor(prereq: string, target: string) {
    this.id = prereq.concat("-").concat(target);
    this.source = prereq;
    this.target = target;
  }
}
