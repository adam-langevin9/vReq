import { DetailedCourse } from "@/classes/Course";
import type { Response } from "@/classes/Response";
import http from "../../http-common";

export async function getCourseFor(subj: string, num: number): Promise<DetailedCourse | undefined> {
  try {
    const response: Response<DetailedCourse> = await http.get(`/course/subj/${subj}/num/${num}`);
    if (response?.data) {
      return new DetailedCourse(
        response.data.id,
        response.data.title,
        response.data.hours,
        response.data.descr,
        response.data.listings,
        response.data.selectedListing
      );
    }
  } catch {
    return;
  }
}
