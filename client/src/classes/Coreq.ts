import type { DetailedCombo } from "./Combo";
import { DetailedCourse } from "./Course";

export class DetailedCoreq {
  id: number;
  courses: DetailedCourse[];
  prereq?: DetailedCombo;
  precoreq?: DetailedCombo;

  constructor(id: number, courses: DetailedCourse[], prereq?: DetailedCombo, precoreq?: DetailedCombo) {
    this.id = id;
    this.courses = [];
    courses.forEach((course) =>
      this.courses.push(
        new DetailedCourse(course.id, course.title, course.hours, course.descr, course.listings, course.selectedListing)
      )
    );
    this.prereq = prereq;
    this.precoreq = precoreq;
  }

  getListingsString() {
    return this.courses
      .slice(0, -1)
      .reduce((acc, curr) => acc.concat(curr.getListingsString()).concat(" / "), "")
      .concat(this.courses[this.courses.length - 1].getListingsString());
  }
}

export class CoreqTitle {
  id: number;
  courses: DetailedCourse[];

  constructor(detailedCoreq: DetailedCoreq) {
    this.id = detailedCoreq.id;
    this.courses = [];
    detailedCoreq.courses.forEach((course) =>
      this.courses.push(
        new DetailedCourse(course.id, course.title, course.hours, course.descr, course.listings, course.selectedListing)
      )
    );
  }

  getListingsString() {
    return this.courses
      .slice(0, -1)
      .reduce((acc, curr) => acc.concat(curr.getListingsString()).concat(" / "), "")
      .concat(this.courses[this.courses.length - 1].getListingsString());
  }
}
