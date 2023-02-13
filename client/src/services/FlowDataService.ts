import http from "../http-common";
import type { AxiosResponse } from "axios";
import { createNode, type CustomNode } from "@/classes/CustomNode";
import { createEdge, type CustomEdge } from "@/classes/CustomEdge";

export type ListingDataDTO = { id: number; subj: string; num: number };
export type CourseDataDTO = {
  id: number;
  title: string;
  descr: string;
  hours: string;
  listings: Array<ListingDataDTO>;
  selectedListing: number;
};
export type CoreqNodeDTO = { id: string; courses: Array<CourseDataDTO>; manual: boolean };
export type DegreeNodeDTO = { id: string; title: string; otherReqs?: string; manual: boolean };
export type NodeDTO = CoreqNodeDTO | DegreeNodeDTO;

export type AltComboDTO = { comboID: number; optionID: number; selectedOptionID: number };
export type EdgeDTO = { id: string; source: string; target: string; animated: boolean; altCombo: AltComboDTO };

type CoreqFlowDTO = { edges: Array<EdgeDTO>; nodes: Array<CoreqNodeDTO> };
export type FlowDTO = { edges: Array<EdgeDTO>; nodes: Array<NodeDTO> };

export async function getCoreqFlow(
  subj: string,
  num: number,
  startYear: number = new Date().getFullYear()
): Promise<{ nodes: Array<CustomNode>; edges: Array<CustomEdge> } | undefined> {
  const flowDTOs = await getCoreqFlowDTOsFor(subj, num, startYear);
  if (!flowDTOs) {
    return;
  }
  const nodes = flowDTOs.nodes.map((nodeDTO) => createNode(nodeDTO));
  const edges = flowDTOs.edges.map((edgeDTO) => createEdge(edgeDTO));
  return { nodes, edges };
}

export async function getDegreeFlow(
  degree_id: number,
  startYear: number = new Date().getFullYear()
): Promise<{ nodes: Array<CustomNode>; edges: Array<CustomEdge> } | undefined> {
  const flowDTOs = await getDegreeFlowDTOsFor(degree_id, startYear);
  if (!flowDTOs) {
    return;
  }
  const nodes = flowDTOs.nodes.map((nodeDTO) => createNode(nodeDTO));
  const edges = flowDTOs.edges.map((edgeDTO) => createEdge(edgeDTO));
  return { nodes, edges };
}

async function getCoreqFlowDTOsFor(subj: string, num: number, startYear: number): Promise<CoreqFlowDTO | undefined> {
  const response: AxiosResponse<CoreqFlowDTO> = await http.get(`/flow/${subj}/${num}/${startYear}`);
  return response?.data;
}

async function getDegreeFlowDTOsFor(degree_id: number, startYear: number): Promise<FlowDTO | undefined> {
  const response: AxiosResponse<FlowDTO> = await http.get(`/flow/${degree_id}/${startYear}`);
  return response?.data;
}
