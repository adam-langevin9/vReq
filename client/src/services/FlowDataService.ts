import http from "../http-common";
import type { Response } from "@/classes/Response";
import { CustomNode } from "@/classes/CustomNode";
import { CustomEdge } from "@/classes/CustomEdge";

export type ListingFlowDTO = { id: number; subj: string; num: number };
type CourseFlowDTO = {
  id: number;
  title: string;
  descr: string;
  hours: string;
  listings: Array<ListingFlowDTO>;
  selectedListing: number;
};
type CoreqFlowDTO = { id: number; courses: Array<CourseFlowDTO>; manual: boolean };
export type NodeDTO = CoreqFlowDTO;

export type AltCombo = { comboID: number; optionID: number };
export type EdgeDTO = { source: number; target: number; animated: false; altCombo: AltCombo };

export type FlowDTO = { edges: Array<EdgeDTO>; nodes: Array<NodeDTO> };

async function getFlowDTOsFor(subj: string, num: number, startYear: number): Promise<FlowDTO | undefined> {
  const response: Response<FlowDTO> = await http.get(`/flow/${subj}/${num}/${startYear}`);
  return response?.data;
}

export async function getFlowFor(
  subj: string,
  num: number,
  startYear: number = new Date().getFullYear()
): Promise<{ nodes: Array<CustomNode>; edges: Array<CustomEdge> } | undefined> {
  const flowDTOs = await getFlowDTOsFor(subj, num, startYear);
  if (!flowDTOs) {
    return;
  }
  const nodes = flowDTOs.nodes.map((nodeDTO) => new CustomNode(nodeDTO));
  const edges = flowDTOs.edges.map((edgeDTO) => new CustomEdge(edgeDTO));
  return { nodes, edges };
}
