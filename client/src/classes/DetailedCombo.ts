import type { DetailedCoreqAttributes } from "./DetailedCoreq";

export interface DetailedComboAttributes {
  op: "AND" | "OR" | "ONE";
  elements: Array<DetailedComboAttributes | DetailedCoreqAttributes>;
}
