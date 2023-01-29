import http from "../../http-common";
import { DetailedCoreq } from "@/classes/Coreq";
import type { Response } from "@/classes/Response";

export async function getDetailedCoreqFor(subj: string, num: number): Promise<DetailedCoreq | undefined> {
  try {
    const response: Response<DetailedCoreq> = await http.get(`/coreq/subj/${subj}/num/${num}`);
    if (response?.data) {
      return new DetailedCoreq(response.data.id, response.data.courses, response.data.prereq, response.data.precoreq);
    }
  } catch {
    return;
  }
}
