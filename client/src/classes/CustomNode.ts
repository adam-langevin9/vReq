import type {
  XYPosition,
  Node,
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
import type { CoreqNodeDTO, CourseDataDTO, DegreeNodeDTO, ListingDataDTO, NodeDTO } from "@/services/FlowDataService";

export type CustomNode = CoreqNode | DegreeNode;

export const createNode = (nodeDTO: NodeDTO): CustomNode => {
  if ("courses" in nodeDTO) {
    return new CoreqNode(nodeDTO);
  }
  return new DegreeNode(nodeDTO);
};

export const getAllListings = (node: GraphNode<CoreqNodeData, any>): string => {
  return node.data.courses
    .reduce(
      (listings: string, course: CourseDataDTO) =>
        listings.concat(
          course.listings.reduce((subListings, listing) => subListings.concat(`${listing.subj} ${listing.num} / `), "")
        ),
      ""
    )
    .slice(0, -3);
};

export const getSelectedName = (node: GraphNode<CustomNodeData, any>): string => {
  return "courses" in node.data ? getSelectedListing(node as GraphNode<CoreqNodeData, any>) : node.data.title;
};

const getSelectedListing = (node: GraphNode<CoreqNodeData, any>): string => {
  return node.data.courses
    .map((course) => course.listings[course.selectedListing])
    .reduce((listings: string, listing: ListingDataDTO) => listings.concat(`${listing.subj} ${listing.num} / `), "")
    .slice(0, -3);
};

export type CustomNodeData =
  | (Omit<CoreqNodeDTO, "id"> & {
      semiAvailable: boolean;
      available: boolean;
      complete: boolean;
      hidden: boolean;
    })
  | (Omit<DegreeNodeDTO, "id"> & {
      complete: boolean;
      hidden: boolean;
    });

export type CoreqNodeData = Omit<CoreqNodeDTO, "id"> & CustomNodeData;

export type DegreeNodeData = Omit<DegreeNodeDTO, "id"> & CustomNodeData;

interface ICustomNode extends Node<CustomNodeData> {
  id: string;
  position: XYPosition;
  data: CustomNodeData;
  type: "coreq" | "degree";
  width: "175px" | "185px";
  height: string;
  draggable: boolean;
  hidden: false;
  connectable: false;
}

interface IDegreeNode extends ICustomNode {
  data: DegreeNodeData;
  type: "degree";
  width: "175px";
  height: "auto";
  deletable: true;
}

interface ICoreqNode extends ICustomNode {
  data: CoreqNodeData;
  type: "coreq";
  width: "175px" | "185px";
  height: string;
}

class CoreqNode implements ICoreqNode {
  readonly id;
  position = { x: 0, y: 0 };
  readonly data: CoreqNodeData;
  readonly type = "coreq";
  readonly width: "175px" | "185px";
  readonly height: string;
  draggable: boolean;
  deletable: boolean;
  readonly hidden = false;
  readonly connectable = false;
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

  constructor(nodeDTO: CoreqNodeDTO) {
    this.id = nodeDTO.id.toString();
    this.data = {
      courses: nodeDTO.courses,
      manual: nodeDTO.manual,
      semiAvailable: false,
      available: false,
      complete: false,
      hidden: !nodeDTO.manual,
    };
    this.width = nodeDTO.courses.length === 1 ? "175px" : "185px";
    this.height = nodeDTO.courses.length === 1 ? "45px" : (50 * nodeDTO.courses.length + 5).toString().concat("px");
    this.draggable = true;
    this.deletable = false;
  }
}

class DegreeNode implements IDegreeNode {
  readonly id;
  position = { x: 0, y: 0 };
  readonly data;
  readonly type = "degree";
  readonly width = "175px";
  readonly height = "auto";
  readonly draggable = false;
  readonly deletable = true;
  readonly hidden = false;
  readonly connectable = false;
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

  constructor(degreeNodeDTO: DegreeNodeDTO) {
    this.id = degreeNodeDTO.id;
    this.data = {
      title: degreeNodeDTO.title,
      otherReqs: degreeNodeDTO.otherReqs,
      complete: false,
      hidden: false, // While theses nodes are always hidden, this is marked false so that its requirements are not hidden
      manual: true,
    };
  }
}
