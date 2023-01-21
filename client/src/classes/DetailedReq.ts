import type { DetailedCoreqAttributes } from "./DetailedCoreq";

export interface DetailedReqAttributes {
  op: "AND" | "OR" | "ONE";
  elements: Array<DetailedReqAttributes | DetailedCoreqAttributes>;
}
