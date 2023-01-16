export interface DetailedCoreqAttributes {
  id: number;
  prereq_id?: number;
  precoreq_id?: number;
  courses: Array<{
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
  }>;
}

export class DetailedCoreq implements DetailedCoreqAttributes {
  readonly id: number;
  readonly prereq_id?: number;
  readonly precoreq_id?: number;
  readonly courses: Array<{
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
  }>;

  constructor(detailedCoreq: DetailedCoreqAttributes) {
    this.id = detailedCoreq.id;
    this.prereq_id = detailedCoreq.prereq_id;
    this.precoreq_id = detailedCoreq.precoreq_id;
    this.courses = detailedCoreq.courses;
  }
}
