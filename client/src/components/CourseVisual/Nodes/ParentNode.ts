import type { DetailedCoreq } from "@/classes/DetailedCoreq";
import { Position, type XYPosition } from "@vue-flow/core";
import type { Node } from "@vue-flow/core";
import type { DetailedCourse } from "@/classes/DetailedCourse";

export class ParentNode implements Node {
  readonly id: string;
  readonly position: XYPosition;
  readonly data: DetailedCourse;
  readonly height: string;

  readonly sourcePosition = Position.Right;
  readonly targetPosition = Position.Left;
  readonly width = "185px";
  readonly deletable = false;
  readonly connectable = false;

  constructor(position: XYPosition, data: DetailedCoreq) {
    this.id = data.id.toString();
    this.position = position;
    this.data = data.courses[0];
    this.height = (50 * data.courses.length + 5).toString().concat("px");
    console.log(this.position, this.width, this.height);
  }
}
