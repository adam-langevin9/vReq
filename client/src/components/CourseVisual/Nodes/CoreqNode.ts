import type { Listing } from "@/classes/Listing";
import type { XYPosition } from "@vue-flow/core";
export class CoreqNode {
  readonly id: string;
  readonly parentNode: string;
  readonly position: XYPosition;
  readonly data: Listing;

  readonly type = "coreq";
  readonly extent = "parent";
  readonly deletable = false;
  readonly connectable = false;
  readonly draggable = false;

  constructor(id: string, parentNode: string, position: XYPosition, data: Listing) {
    this.id = id;
    this.parentNode = parentNode;
    this.position = position;
    this.data = data;
  }
}
