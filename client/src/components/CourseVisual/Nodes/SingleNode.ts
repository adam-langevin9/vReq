import type { DetailedCoreqAttributes } from "@/classes/DetailedCoreq";
import { Position, type XYPosition } from "@vue-flow/core";
import type { Node } from "@vue-flow/core";
import type { DetailedCourseAttributes } from "@/classes/DetailedCourse";

export class SingleNode implements Node {
  readonly id: string;
  readonly position: XYPosition;
  readonly data: DetailedCourseAttributes;

  readonly type = "single";
  readonly width = "175px";
  readonly height = "45px";
  readonly sourcePosition = Position.Right;
  readonly targetPosition = Position.Left;
  readonly deletable = false;
  readonly connectable = false;

  constructor(position: XYPosition, data: DetailedCoreqAttributes) {
    this.id = data.id.toString();
    this.position = position;
    this.data = data.courses[0];
  }
}
