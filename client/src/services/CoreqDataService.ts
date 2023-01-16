import http from "../http-common";
import type { DetailedCoreq } from "@/classes/DetailedCoreq";

interface Coreq {
  id: number;
  prereq_id: string | undefined;
  precoreq_id: string | undefined;
}

interface GetCoreqResponse {
  data: Coreq;
}

interface GetCoreqsResponse {
  data: Coreq[];
}

interface GetDetailedCoreqResponse {
  data: DetailedCoreq;
}

class CourseDataService {
  async getAll(): Promise<GetCoreqsResponse> {
    return await http.get("/coreq");
  }

  async getByID(id: number): Promise<GetCoreqResponse> {
    return await http.get(`/coreq/${id}`);
  }

  async getDetailedByListing(subj: string, num: number): Promise<GetDetailedCoreqResponse> {
    return await http.get(`/coreq/subj/${subj}/num/${num}`);
  }
}

export default new CourseDataService();
