export interface DetailedCourseAttributes {
  id: number;
  title: string;
  hours: string;
  descr?: string;
  selectedListing: {
    id: number;
    subj: string;
    num: number;
  };
  listings: Array<{
    id: number;
    subj: string;
    num: number;
  }>;
}

export class DetailedCourse implements DetailedCourseAttributes {
  readonly id: number;
  readonly title: string;
  readonly hours: string;
  readonly descr?: string;
  readonly selectedListing: {
    id: number;
    subj: string;
    num: number;
  };
  readonly listings: { readonly id: number; readonly subj: string; readonly num: number }[];

  constructor(detailedCourse: DetailedCourseAttributes) {
    this.id = detailedCourse.id;
    this.title = detailedCourse.title;
    this.hours = detailedCourse.hours;
    this.selectedListing = detailedCourse.selectedListing;
    this.listings = detailedCourse.listings;
  }
}
