import { Combo, Listing } from "../models/init-models";
import { DetailedCoreq, getDetailedCoreq } from "./CoreqUtility";

export interface DetailedCombo {
  op: "AND" | "OR" | "ONE";
  elements: Array<DetailedCombo | DetailedCoreq>;
}

export async function getDetailedCombo(rootCombo: Combo, selectedListing: Listing): Promise<DetailedCombo> {
  const detailedReq: DetailedCombo = { op: rootCombo.op, elements: [] };

  // Traverses ComboCoreqs
  for (var coreq of await rootCombo.getCoreq_id_coreqs()) {
    detailedReq.elements.push(await getDetailedCoreq(coreq, selectedListing));
  }

  // Traverses ComboCombs
  for (var subCombo of await rootCombo.getCombo_id_combos()) {
    detailedReq.elements.push(await getDetailedCombo(subCombo, selectedListing));
  }

  return detailedReq;
}
