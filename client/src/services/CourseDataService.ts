import http from "../http-common";

type Course = {
  course_id: number;
  course_title: string;
  course_descr: string;
  course_hours: string;
  course_prereqs: number;
  course_precorecs: number;
};

type GetCourseResponse = {
  data: Course;
};

type GetCoursesResponse = {
  data: Course[];
};

class CourseDataService {
  async getAll(): Promise<GetCoursesResponse> {
    return await http.get("/course");
  }

  async getByID(id: number): Promise<GetCourseResponse> {
    return await http.get(`/course/${id}`);
  }
}

export default new CourseDataService();
