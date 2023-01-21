import type { DetailedComboAttributes } from "./DetailedCombo";
import type { DetailedCourseAttributes } from "./DetailedCourse";

export interface DetailedCoreqAttributes {
  id: number;
  prereq?: DetailedComboAttributes;
  precoreq?: DetailedComboAttributes;
  courses: DetailedCourseAttributes[];
}
