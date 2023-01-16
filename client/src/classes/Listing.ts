export interface ListingAttributes {
  id: number;
  subj: string;
  num: number;
}

export class Listing {
  id: number;
  subj: string;
  num: number;

  constructor(id: number, subj: string, num: number) {
    this.id = id;
    this.subj = subj;
    this.num = num;
  }
}
