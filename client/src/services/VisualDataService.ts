import type { FlowExportObject } from "@vue-flow/core";
import type { AxiosResponse } from "axios";
import http from "../http-common";
export type VisualDTO = {
  id: number;
  title: string;
  user_id: string;
  start_year: number;
  elements: FlowExportObject;
};
export type VisualTitleDTO = { id: number; title: string };

export async function createVisual(
  visualData: Omit<VisualDTO, "id"> & { id?: number }
): Promise<VisualDTO | undefined> {
  const response: AxiosResponse<VisualDTO> = await http.put("/visual", visualData);
  if (response.status === 200) return response.data;
}
export async function readVisual(id: number): Promise<VisualDTO | undefined> {
  const response: AxiosResponse<VisualDTO> = await http.post("/visual", { id });
  if (response.status === 200) return response.data;
}
export async function readTitles(user_id: string): Promise<VisualTitleDTO[] | undefined> {
  const response: AxiosResponse<VisualTitleDTO[]> = await http.post("/visual/titles", { user_id });
  if (response.status === 200) return response.data;
}
export async function updateVisual(
  updatedData: { id: number; title?: string; user_id?: string; start_year?: number; elements?: string } & (
    | { title: string }
    | { user_id: string }
    | { start_year: number }
    | { elements: string }
  )
): Promise<number> {
  const response: AxiosResponse<number> = await http.patch("/visual", updatedData);
  if (response.data) return response.data;
  return 0;
}
export async function deleteVisual(id: number): Promise<number> {
  const response: AxiosResponse<number> = await http.delete("/visual", { data: { id } });
  if (response.data) return response.data;
  return 0;
}
