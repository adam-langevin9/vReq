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
  Position,
  StyleFunc,
  Styles,
  ValidConnectionFunc,
} from "@vue-flow/core";
import type { VNode, RendererNode, RendererElement, Component, ComputedOptions, MethodOptions } from "vue";
import type { DetailedCourse } from "./Course";

export interface ICustomNodeData extends ElementData {
  courses: DetailedCourse[];
  complete: boolean;
  manual: boolean;
  altReqs: AltReq[];
  hidden: boolean;
  selected: boolean;
}

interface ICustomNode extends Node<ICustomNodeData> {
  id: string;
  position: XYPosition;
  data: ICustomNodeData;
  type: "course";
  width: "175px" | "185px";
  height: string;
  draggable: boolean;
  deletable: boolean;
  hidden: boolean;
  connectable: boolean;
}

export class CustomNode implements ICustomNode {
  readonly id: string;
  position: XYPosition = { x: 0, y: 0 };
  readonly data: ICustomNodeData;
  readonly type: "course" = "course";
  readonly width: "175px" | "185px";
  readonly height: string;
  draggable: boolean = true;
  deletable: boolean = false;
  readonly hidden: boolean = false;
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

  constructor(
    id: string,
    courses: DetailedCourse[],
    manual: boolean = true,
    hidden: boolean = false,
    selected: boolean = false
  ) {
    this.id = id.toString();
    this.data = { courses, manual, complete: false, altReqs: [], hidden, selected };
    this.width = courses.length === 1 ? "175px" : "185px";
    this.height = courses.length === 1 ? "45px" : (50 * courses.length + 5).toString().concat("px");
  }
}
