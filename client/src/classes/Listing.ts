export class Listing {
  id: number;
  subj: string;
  num: number;

  constructor(id: number, subj: string, num: number) {
    this.id = id;
    this.subj = subj;
    this.num = num;
  }

  toString() {
    return this.subj.concat(" ").concat(this.num.toString());
  }
}
