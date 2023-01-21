import { MarkerType, type Edge } from "@vue-flow/core";

type CustomEdge = Edge & {
  id: string;
  source: string;
  target: string;
  markerEnd: string;
  selectable: boolean;
  animated: boolean;
};

export function createHardEdge(source_id: string, target_id: string): CustomEdge {
  return {
    id: createEdgeID(source_id, target_id),
    source: source_id,
    target: target_id,
    markerEnd: MarkerType.ArrowClosed,
    selectable: false,
    animated: false,
  };
}

export function createSoftEdge(source_id: string, target_id: string): CustomEdge {
  return {
    id: createEdgeID(source_id, target_id),
    source: source_id,
    target: target_id,
    markerEnd: MarkerType.ArrowClosed,
    selectable: false,
    animated: true,
  };
}

export function createEdgeID(source_id: string, target_id: string): string {
  return source_id.concat("-").concat(target_id);
}
