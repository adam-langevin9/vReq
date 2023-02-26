import type { AxiosResponse } from "axios";
import http from "../http-common";

export async function validListing(subj: string, num: string): Promise<boolean | undefined> {
  const response: AxiosResponse<boolean> = await http.get("/listing/valid", {
    params: { subj, num },
  });
  return response?.data;
}
