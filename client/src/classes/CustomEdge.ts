import { MarkerType } from "@vue-flow/core";
import type { DefaultEdge } from "@vue-flow/core";
import type { AltComboDTO, EdgeDTO } from "@/services/FlowDataService";

export type altCombo = AltComboDTO;

export type CustomEdgeData = {
  hidden: boolean;
  altCombo?: altCombo;
};

export type CustomEdge = DefaultEdge<CustomEdgeData> &
  Omit<EdgeDTO, "altCombo"> & {
    markerEnd: string;
    selectable: boolean;
  };

export const createEdge = (edgeDTO: EdgeDTO): CoreqEdge | DegreeEdge =>
  edgeDTO.target.slice(undefined, 1) === "c" ? new CoreqEdge(edgeDTO) : new DegreeEdge(edgeDTO);

class CoreqEdge implements CustomEdge {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  markerEnd: string = MarkerType.Arrow;
  selectable: boolean = false;
  data: CustomEdgeData;
  type: string = "coreq";

  constructor(edgeDTO: EdgeDTO) {
    this.id = edgeDTO.id;
    this.source = edgeDTO.source;
    this.target = edgeDTO.target;
    this.animated = edgeDTO.animated;
    this.data = { hidden: false, altCombo: edgeDTO.altCombo };
  }
}

class DegreeEdge implements CustomEdge {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  markerEnd: string = MarkerType.Arrow;
  selectable: boolean = false;
  data: CustomEdgeData;
  type: string = "degree";

  constructor(edgeDTO: EdgeDTO) {
    this.id = edgeDTO.id;
    this.source = edgeDTO.source;
    this.target = edgeDTO.target;
    this.animated = edgeDTO.animated;
    this.data = { hidden: false, altCombo: edgeDTO.altCombo };
  }
}
