import { DetailedCoreq } from "./Coreq";

export type ReqOp = "AND" | "OR" | "ONE";

export class DetailedCombo {
  op: ReqOp;
  elements: Array<DetailedCombo | DetailedCoreq>;

  constructor(op: ReqOp, elements: Array<DetailedCombo | DetailedCoreq>) {
    this.op = op;
    this.elements = [];
    elements.forEach((element) => {
      if ("op" in element) {
        elements.push(new DetailedCombo(element.op, element.elements));
      } else {
        elements.push(new DetailedCoreq(element.id, element.courses, element.prereq, element.precoreq));
      }
    });
  }
}
