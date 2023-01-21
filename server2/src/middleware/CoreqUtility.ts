import { Coreq, Listing } from "../models/init-models";
import { DetailedCourse, getDetailedCourse } from "./CourseUtility";
import { DetailedCombo, getDetailedCombo } from "./ComboUtility";
import { getRecentReq } from "./ReqUtility";

export interface DetailedCoreq {
  id: number;
  prereq?: DetailedCombo;
  precoreq?: DetailedCombo;
  courses: DetailedCourse[];
}

export async function getDetailedCoreq(
  coreq: Coreq,
  selectedListing: Listing,
  start_year?: number
): Promise<DetailedCoreq> {
  const courses = await coreq.getCourses();

  const detailedCoreq: DetailedCoreq = {
    id: coreq.id,
    prereq: coreq.prereq_id
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        await getDetailedCombo(await (await getRecentReq(coreq.prereq_id, start_year))?.getCombo()!, selectedListing)
      : undefined,
    precoreq: coreq.precoreq_id
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        await getDetailedCombo(await (await getRecentReq(coreq.precoreq_id, start_year))?.getCombo()!, selectedListing)
      : undefined,
    courses: [],
  };

  for (const course of courses) {
    detailedCoreq.courses.push(await getDetailedCourse(course, selectedListing));
  }

  return detailedCoreq;
}
