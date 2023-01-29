import { Combo, Listing } from "../models/init-models";
import { DetailedCoreq, getDetailedCoreq } from "./CoreqUtility";

export interface DetailedCombo {
  op: "AND" | "OR" | "ONE";
  elements: Array<DetailedCombo | DetailedCoreq>;
}

export async function getDetailedCombo(rootCombo: Combo, selectedListing: Listing): Promise<DetailedCombo> {
  const detailedCombo: DetailedCombo = { op: rootCombo.op, elements: [] };

  // Traverses ComboCoreqs
  const coreqs = await rootCombo.getCoreq_id_coreqs();
  for (const coreq of coreqs) {
    detailedCombo.elements.push(await getDetailedCoreq(coreq, selectedListing));
  }

  // Traverses ComboCombs
  const combos = await rootCombo.getSub_combo_id_combos();
  for (const subCombo of combos) {
    detailedCombo.elements.push(await getDetailedCombo(subCombo, selectedListing));
  }

  return detailedCombo;
}
