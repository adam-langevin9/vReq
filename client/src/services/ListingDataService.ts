import http from "../http-common";

interface Listing {
  id: number;
  subj: string;
  num: number;
  course_id: number;
}

interface GetListingResponse {
  data: Listing;
}

interface GetListingsResponse {
  data: Listing[];
}

class CourseDataService {
  async getAll(): Promise<GetListingsResponse> {
    return await http.get("/listing");
  }

  async getByID(id: number | undefined): Promise<GetListingResponse> {
    return await http.get(`/listing/${id}`);
  }
}

export default new CourseDataService();
