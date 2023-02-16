import http from "../http-common";
import type { AxiosResponse } from "axios";
import { createNode, type CustomNode } from "@/classes/CustomNode";
import { createEdge, type CustomEdge } from "@/classes/CustomEdge";

export interface ListingDataDTO {
  id: number;
  subj: string;
  num: number;
}
export interface CourseDataDTO {
  id: number;
  title: string;
  descr: string;
  hours: string;
  listings: ListingDataDTO[];
  selectedListing: number;
}
export interface CoreqNodeDTO {
  id: string;
  courses: CourseDataDTO[];
  manual: boolean;
}
export interface DegreeNodeDTO {
  id: string;
  title: string;
  otherReqs?: string;
  manual: boolean;
}
export type NodeDTO = CoreqNodeDTO | DegreeNodeDTO;

export interface AltComboDTO {
  comboID: number;
  optionID: number;
  selectedOptionID: number;
}
export interface EdgeDTO {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  altCombo: AltComboDTO;
}

interface CoreqFlowDTO {
  edges: EdgeDTO[];
  nodes: CoreqNodeDTO[];
}
export interface FlowDTO {
  edges: EdgeDTO[];
  nodes: NodeDTO[];
}

export async function getCoreqFlow(
  subj: string,
  num: number,
  startYear: number = new Date().getFullYear()
): Promise<{ nodes: CustomNode[]; edges: CustomEdge[] } | undefined> {
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
): Promise<{ nodes: CustomNode[]; edges: CustomEdge[] } | undefined> {
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
