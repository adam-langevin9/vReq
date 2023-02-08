import type { AxiosResponse } from "axios";
import http from "../http-common";
export type CourseDTO = { title: string; descr: string; hours: string };
export async function getCourseFor(subj: string, num: number): Promise<CourseDTO | undefined> {
  const response: AxiosResponse<CourseDTO> = await http.get(`/course/${subj}/${num}`);
  return response?.data;
}
