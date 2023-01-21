import type { DetailedCoreqAttributes } from "@/classes/DetailedCoreq";
import type { DetailedCourseAttributes } from "@/classes/DetailedCourse";
import type { XYPosition } from "@vue-flow/core";
import type { Node } from "@vue-flow/core";

export class ChildNode implements Node {
  readonly id: string;
  readonly parentNode: string;
  readonly position: XYPosition;
  readonly data: DetailedCourseAttributes;

  readonly type = "child";
  readonly extent = "parent";
  readonly width = "175px";
  readonly height = "45px";
  readonly deletable = false;
  readonly connectable = false;
  readonly draggable = false;

  constructor(idx: number, data: DetailedCoreqAttributes) {
    this.id = data.courses[idx].id.toString();
    this.parentNode = data.id.toString();
    this.position = { x: 5, y: 5 + 50 * idx };
    this.data = data.courses[idx];
  }
}
