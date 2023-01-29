import type { CoreqTitle } from "./Coreq";

export class AltReq {
  opts: CoreqTitle[][];
  selectedOpt: CoreqTitle[];
  constructor(opts: CoreqTitle[][] = [], selectedOpt: CoreqTitle[] = []) {
    this.opts = opts;
    this.selectedOpt = selectedOpt;
  }
}

export class AltReqGroup {
  targetID: number;
  reqs: AltReq[];
  constructor(targetID: number, reqs: AltReq[] = []) {
    this.targetID = targetID;
    this.reqs = reqs;
  }
}
