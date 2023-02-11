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
import type { CourseFlowDTO, ListingFlowDTO, NodeDTO } from "@/services/FlowDataService";

export type CustomNodeData = Omit<NodeDTO, "id"> & {
  complete: boolean;
  hidden: boolean;
};

interface ICustomNode extends Node<CustomNodeData> {
  id: string;
  position: XYPosition;
  data: CustomNodeData;
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
  readonly data: CustomNodeData;
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
    | Component<any, any, any, ComputedOptions, MethodOptions>;
  targetPosition?: Position;
  sourcePosition?: Position;
  selectable?: boolean;
  focusable?: boolean;
  dragHandle?: string;
  isValidTargetPos?: ValidConnectionFunc;
  isValidSourcePos?: ValidConnectionFunc;
  extent?: CoordinateExtent | ExtendedParentExtent | "parent";
  expandParent?: boolean;
  parentNode?: string;
  class?: string | ClassFunc<GraphNode<any, any>>;
  style?: Styles | StyleFunc<GraphNode<any, any>>;
  template?: NodeComponent;
  zIndex?: number;
  ariaLabel?: string;

  constructor(nodeDTO: NodeDTO) {
    this.id = nodeDTO.id.toString();
    this.data = {
      courses: nodeDTO.courses,
      manual: nodeDTO.manual,
      complete: false,
      hidden: false,
    };
    this.width = nodeDTO.courses.length === 1 ? "175px" : "185px";
    this.height = nodeDTO.courses.length === 1 ? "45px" : (50 * nodeDTO.courses.length + 5).toString().concat("px");
  }
}

export function getAllListings(node: GraphNode<CustomNodeData, any>): string {
  return node.data.courses
    .reduce(
      (listings: string, course: CourseFlowDTO) =>
        listings.concat(
          course.listings.reduce((subListings, listing) => subListings.concat(`${listing.subj} ${listing.num} / `), "")
        ),
      ""
    )
    .slice(0, -3);
}

export function getSelectedListings(node: GraphNode<CustomNodeData, any>): string {
  return node.data.courses
    .map((course) => course.listings[course.selectedListing])
    .reduce((listings: string, listing: ListingFlowDTO) => listings.concat(`${listing.subj} ${listing.num} / `), "")
    .slice(0, -3);
}
