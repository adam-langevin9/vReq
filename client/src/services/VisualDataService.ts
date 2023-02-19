import type { AxiosResponse } from "axios";
import http from "../http-common";
export type VisualDTO = {
  id: number;
  title: string;
  user_id: string;
  start_year: number;
  elements: JSON;
};
export async function createVisual(
  visualData: Omit<VisualDTO, "id"> & { id?: number }
): Promise<VisualDTO | undefined> {
  const response: AxiosResponse<VisualDTO> = await http.put("/visual", visualData);
  if (response.status === 200) return response.data;
}
export async function getVisual(id: number): Promise<VisualDTO | undefined> {
  const response: AxiosResponse<VisualDTO> = await http.post("/visual", { id });
  if (response.status === 200) return response.data;
}
export async function updateVisual(
  updatedData: { id: number; title?: string; user_id?: string; start_year?: number; elements?: JSON } & (
    | { title: string }
    | { user_id: string }
    | { start_year: number }
    | { elements: JSON }
  )
): Promise<number> {
  const response: AxiosResponse<number> = await http.patch("/visual/title", updatedData);
  if (response.data) return response.data;
  return 0;
}
export async function deleteVisual(id: number): Promise<number> {
  const response: AxiosResponse<number> = await http.delete("/visual", { data: { id } });
  if (response.data) return response.data;
  return 0;
}
