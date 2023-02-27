import type { AxiosResponse } from "axios";
import http from "../http-common";
import type { VisualDTO } from "./VisualDataService";
export type UserDTO = {
  id: string;
  visuals: VisualDTO[];
};

export async function createUser(id: string, pw: string): Promise<UserDTO | undefined> {
  const response: AxiosResponse<UserDTO> = await http.put("/user", { id, pw });
  if (response.status >= 200 && response.status < 300) return response.data;
  return;
}

export async function isAvailable(id: string): Promise<boolean | undefined> {
  const response: AxiosResponse<{ isAvailable: boolean }> = await http.post("/user/isAvailable", { id });
  return response.data.isAvailable;
}

export async function exists(id: string): Promise<boolean | undefined> {
  const response: AxiosResponse<{ isAvailable: boolean }> = await http.post("/user/isAvailable", { id });
  return !response.data.isAvailable;
}

export async function verifyUser(id: string, pw: string): Promise<boolean | undefined> {
  const response: AxiosResponse<{ verified: boolean }> = await http.post("/user/verify", { id, pw });
  return response.data.verified;
}

export async function loginUser(id: string, pw: string): Promise<UserDTO | undefined> {
  const response: AxiosResponse<UserDTO> = await http.post("/user", { id, pw });
  if (response.status >= 200 && response.status < 300) return response.data;
  return;
}
