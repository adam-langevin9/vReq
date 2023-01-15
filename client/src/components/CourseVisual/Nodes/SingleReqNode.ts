import type { Listing } from "@/classes/Listing";
import { Position, type XYPosition } from "@vue-flow/core";
export class SingleReqNode {
  readonly id: string;
  readonly position: XYPosition;
  readonly data: Listing;

  readonly type = "single";
  readonly sourcePosition = Position.Right;
  readonly targetPosition = Position.Left;
  readonly deletable = false;
  readonly connectable = false;

  constructor(id: string, position: XYPosition, data: Listing) {
    this.id = id;
    this.position = position;
    this.data = data;
  }
}
