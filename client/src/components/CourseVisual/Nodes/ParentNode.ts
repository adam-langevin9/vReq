import { Position, type XYPosition } from "@vue-flow/core";
export class ParentNode {
  readonly id: string;
  readonly position: XYPosition;

  readonly sourcePosition = Position.Right;
  readonly targetPosition = Position.Left;
  readonly width = "185px";
  readonly height = "105px";
  readonly deletable = false;
  readonly connectable = false;

  constructor(id: string, position: XYPosition) {
    this.id = id;
    this.position = position;
  }
}
