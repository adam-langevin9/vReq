export interface DetailedCourseAttributes {
  id: number;
  title: string;
  hours: string;
  descr?: string;
  selectedListing: number;
  listings: Array<{
    id: number;
    subj: string;
    num: number;
  }>;
}
