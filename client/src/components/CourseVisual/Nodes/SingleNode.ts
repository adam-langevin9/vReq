import type { DetailedCoreq } from "@/classes/DetailedCoreq";
import { Position, type XYPosition } from "@vue-flow/core";
import type { Node } from "@vue-flow/core";
import type { DetailedCourse } from "@/classes/DetailedCourse";

export class SingleNode implements Node {
  readonly id: string;
  readonly position: XYPosition;
  readonly data: DetailedCourse;

  readonly type = "single";
  readonly width = "175px";
  readonly height = "45px";
  readonly sourcePosition = Position.Right;
  readonly targetPosition = Position.Left;
  readonly deletable = false;
  readonly connectable = false;

  constructor(position: XYPosition, data: DetailedCoreq) {
    this.id = data.id.toString();
    this.position = position;
    this.data = data.courses[0];
    console.log(this.position, this.width, this.height);
  }
}
