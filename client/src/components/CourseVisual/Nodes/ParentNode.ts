import type { DetailedCoreqAttributes } from "@/classes/DetailedCoreq";
import { Position, type XYPosition, type Node } from "@vue-flow/core";
import type { DetailedCourseAttributes } from "@/classes/DetailedCourse";

export class ParentNode implements Node {
  readonly id: string;
  readonly position: XYPosition;
  readonly data: DetailedCourseAttributes;
  readonly height: string;

  readonly sourcePosition = Position.Right;
  readonly targetPosition = Position.Left;
  readonly width = "185px";
  readonly deletable = false;
  readonly connectable = false;

  constructor(position: XYPosition, data: DetailedCoreqAttributes) {
    this.id = data.id.toString();
    this.position = position;
    this.data = data.courses[0];
    this.height = (50 * data.courses.length + 5).toString().concat("px");
  }
}
