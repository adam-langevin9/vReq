import type { DetailedCoreq } from "@/classes/DetailedCoreq";
import type { DetailedCourse } from "@/classes/DetailedCourse";
import type { XYPosition } from "@vue-flow/core";
import type { Node } from "@vue-flow/core";
import { SingleNode } from "./SingleNode";

export class ChildNode implements Node {
  readonly id: string;
  readonly parentNode: string;
  readonly position: XYPosition;
  readonly data: DetailedCourse;

  readonly type = "coreq";
  readonly extent = "parent";
  readonly width = "175px";
  readonly height = "45px";
  readonly deletable = false;
  readonly connectable = false;
  readonly draggable = false;

  constructor(idx: number, data: DetailedCoreq) {
    console.log(data.courses[idx].listings[0]);
    this.id = data.courses[idx].id.toString();
    this.parentNode = data.id.toString();
    this.position = { x: 5, y: 5 + 50 * idx };
    this.data = data.courses[idx];
    console.log(this.position, this.width, this.height);
  }
}
