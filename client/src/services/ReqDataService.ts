import type { DetailedReqAttributes } from "@/classes/DetailedReq";
import http from "../http-common";

interface Req {
  id: number;
  start_year: number;
  combo_id: number;
}

interface GetReqResponse {
  data: Req;
}

interface GetReqsResponse {
  data: Req[];
}

interface GetDetailedReqResponse {
  data: DetailedReqAttributes;
}

class CourseDataService {
  async getAll(): Promise<GetReqsResponse> {
    return await http.get("/req");
  }

  async findDetailedByCoreq(coreq_id: number, start_year?: number): Promise<GetDetailedReqResponse> {
    return await http.get(`/req/detailed/${coreq_id}/${start_year}`);
  }
}

export default new CourseDataService();
