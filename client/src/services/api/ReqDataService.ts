import { DetailedCombo } from "@/classes/Combo";
import type { Response } from "@/classes/Response";
import http from "../../http-common";

export async function getDetailedReqsFor(coreq_id: number, start_year?: number): Promise<DetailedCombo | undefined> {
  try {
    const response: Response<DetailedCombo> = await http.get(`/req/detailed/${coreq_id}/${start_year}`);
    if (response?.data) {
      return new DetailedCombo(response.data.op, response.data.elements);
    }
  } catch {
    return;
  }
}
