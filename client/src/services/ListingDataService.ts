import http from "../http-common";

type Listing = {
  listing_id: number;
  listing_subj: string;
  listing_num: number;
  course_id: number;
};

type GetListingResponse = {
  data: Listing;
};

type GetListingsResponse = {
  data: Listing[];
};

class CourseDataService {
  async getAll(): Promise<GetListingsResponse> {
    return await http.get("/listing");
  }

  async getByID(id: number | undefined): Promise<GetListingResponse> {
    return await http.get(`/listing/${id}`);
  }

  async getByListing(
    listing_subj: string,
    listing_num: number
  ): Promise<GetListingsResponse> {
    return await http.get(
      `/listing?listing_subj=${listing_subj}&listing_num=${listing_num}`
    );
  }
}

export default new CourseDataService();