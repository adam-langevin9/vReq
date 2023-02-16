import type { AxiosResponse } from "axios";
import http from "../http-common";
export interface DegreeDTO {
  id: number;
  title: string;
}
export async function getDegrees(): Promise<DegreeDTO[]> {
  const response: AxiosResponse<DegreeDTO[]> = await http.get("/degree/");
  return response?.data;
}
