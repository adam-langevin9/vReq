import http from "../http-common";

interface Course {
  course_id: number;
  course_title: string;
  course_descr: string;
  course_hours: string;
  course_prereqs: number;
  course_precorecs: number;
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
}

export default new CourseDataService();
