import CustomNode from "@/components/CourseFlow/CustomNode.vue";
import type { AltReq } from "./AltReqGroup";
import type {
  XYPosition,
  Node,
  ElementData,
  ClassFunc,
  CoordinateExtent,
  ExtendedParentExtent,
  GraphNode,
  NodeComponent,
  NodeEventsHandler,
  Position,
  StyleFunc,
  Styles,
  ValidConnectionFunc,
  Dimensions,
  NodeHandleBounds,
  XYZPosition,
  NodeTypesObject,
} from "@vue-flow/core";
import {
  type VNode,
  type RendererNode,
  type RendererElement,
  type Component,
  type ComputedOptions,
  type MethodOptions,
  markRaw,
} from "vue";
import type { DetailedCourse } from "./Course";

interface ICourseNode extends Node<ICourseNodeData> {
  id: string;
  position: XYPosition;
  data: ICourseNodeData;
  type: "course";
  width: "175px" | "185px";
  height: string;
  draggable: boolean;
  deletable: boolean;
  hidden: boolean;
  connectable: boolean;
}

export interface ICourseNodeData extends ElementData {
  courses: DetailedCourse[];
  complete: boolean;
  manual: boolean;
  altReqs: AltReq[];
}

export class CourseNode implements ICourseNode {
  readonly id: string;
  position: XYPosition = { x: 0, y: 0 };
  readonly data: ICourseNodeData;
  readonly type: "course" = "course";
  readonly width: "175px" | "185px";
  readonly height: string;
  draggable: boolean = true;
  deletable: boolean = false;
  hidden: boolean;
  readonly connectable: boolean = false;
  label?:
    | string
    | VNode<RendererNode, RendererElement, { [key: string]: any }>
    | Component<any, any, any, ComputedOptions, MethodOptions>
    | undefined;
  targetPosition?: Position | undefined;
  sourcePosition?: Position | undefined;
  selectable?: boolean | undefined;
  focusable?: boolean | undefined;
  dragHandle?: string | undefined;
  isValidTargetPos?: ValidConnectionFunc | undefined;
  isValidSourcePos?: ValidConnectionFunc | undefined;
  extent?: CoordinateExtent | ExtendedParentExtent | "parent" | undefined;
  expandParent?: boolean | undefined;
  parentNode?: string | undefined;
  class?: string | ClassFunc<GraphNode<any, any>> | undefined;
  style?: Styles | StyleFunc<GraphNode<any, any>> | undefined;
  template?: NodeComponent | undefined;
  zIndex?: number | undefined;
  ariaLabel?: string | undefined;

  constructor(id: string, courses: DetailedCourse[], manual: boolean = true, hidden: boolean = false) {
    this.id = id.toString();
    this.data = { courses, manual, complete: false, altReqs: [] };
    this.width = courses.length === 1 ? "175px" : "185px";
    this.height = courses.length === 1 ? "45px" : (50 * courses.length + 5).toString().concat("px");
    this.hidden = hidden;
  }
}

export const nodeTypes: NodeTypesObject = {
  course: markRaw(CustomNode) as NodeComponent,
};
