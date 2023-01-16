import http from "../http-common";

interface Course {
  id: number;
  title: string;
  descr: string | undefined;
  hours: string;
}

interface GetCourseResponse {
  data: Course;
}

interface GetCoursesResponse {
  data: Course[];
}

class CourseDataService {
  async getAll(): Promise<GetCoursesResponse> {
    return await http.get("/course");
  }

  async getByID(id: number): Promise<GetCourseResponse> {
    return await http.get(`/course/${id}`);
  }

  async getByListing(subj: string, num: number): Promise<GetCourseResponse> {
    return await http.get(`/course/subj/${subj}/num/${num}`);
  }
}

export default new CourseDataService();
