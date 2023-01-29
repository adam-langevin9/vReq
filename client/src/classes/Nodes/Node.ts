import type { Listing } from "../Listing";
import type { AltReq } from "../AltReqGroup";
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
} from "@vue-flow/core";
import type { VNode, RendererNode, RendererElement, Component, ComputedOptions, MethodOptions } from "vue";

interface ICustomNode extends Node<ICustomNodeData> {
  id: string;
  position: XYPosition;
  data: ICustomNodeData;
  type: "default" | "child" | "single";
  width: "175px" | "185px";
  height: string;
  draggable: boolean;
  deletable: boolean;
  hidden: boolean;
  connectable: boolean;
}

export interface ICustomNodeData extends ElementData {
  id: number;
  title: string;
  hours: string;
  descr?: string;
  is_complete: boolean;
  is_manual: boolean;
  selectedListing: number;
  listings: Listing[];
  altReqs: AltReq[];
}

export class CustomNode implements ICustomNode {
  readonly id: string;
  position: XYPosition;
  readonly data: ICustomNodeData;
  readonly type: "default" | "child" | "single";
  readonly width: "175px" | "185px";
  readonly height: string;
  draggable: boolean;
  deletable: boolean;
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

  constructor(
    id: string,
    position: XYPosition,
    data: ICustomNodeData,
    type: "default" | "child" | "single",
    width: "175px" | "185px",
    height: string,
    draggable: boolean,
    deletable: boolean,
    hidden: boolean
  ) {
    this.id = id.toString();
    this.position = position;
    this.data = data;
    this.type = type;
    this.width = width;
    this.height = height;
    this.draggable = draggable;
    this.deletable = deletable;
    this.hidden = hidden;
  }
}
