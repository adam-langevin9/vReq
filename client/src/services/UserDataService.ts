import type { AxiosResponse } from "axios";
import http from "../http-common";
export interface VisualDTO {
  id: number;
  title: string;
  start_year: number;
  elements: JSON;
}
export async function createUser(id: string, pw: string): Promise<boolean> {
  const response: AxiosResponse<boolean> = await http.get(`/user/create/${id}/${pw}`);
  if (response?.data) return response?.data;
  return false;
}

export async function loginUser(id: string, pw: string): Promise<VisualDTO[] | undefined> {
  const response: AxiosResponse<VisualDTO[]> = await http.get(`/user/login/${id}/${pw}`);
  if (response?.data) return response?.data;
  return undefined;
}
