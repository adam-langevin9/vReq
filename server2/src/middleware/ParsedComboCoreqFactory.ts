import { Coreq, Course, Listing, Combo } from "../models/init-models";

class ParsedComboCoreq {
  id: number;
  elements: Array<Coreq | ParsedComboCoreq>;
  op: "AND" | "OR" | "ONE";

  constructor(rootCombo: Combo, elements: Array<Coreq | ParsedComboCoreq>) {
    this.id = rootCombo.id;
    this.op = rootCombo.op;
    this.elements = elements;
  }

  get leafCoreqs(): Coreq[] {
    const coreqs: Coreq[] = [];
    for (const element of this.elements) {
      if ("op" in element) {
        coreqs.push(...element.leafCoreqs);
      } else {
        coreqs.push(element);
      }
    }
    return coreqs;
  }
}

export const isParsedComboCoreq = (obj: Coreq | ParsedComboCoreq): obj is ParsedComboCoreq => "op" in obj;
export type { ParsedComboCoreq };

export async function createParsedComboCoreq(rootCombo: Combo): Promise<ParsedComboCoreq> {
  const elements: Array<Coreq | ParsedComboCoreq> = [];
  // Traverses ParsedComboCoreq
  elements.push(
    ...(await rootCombo.getCoreq_id_coreqs({
      include: [
        {
          model: Course,
          as: "courses",
          include: [{ model: Listing, as: "listings" }],
        },
      ],
    }))
  );

  // Traverses ComboCombs
  const comboCombos = await rootCombo.getCombo_combos({ include: [{ model: Combo, as: "sub_combo" }] });
  const subCombos = comboCombos.map((comboCombo) => comboCombo.sub_combo);

  for (const subCombo of subCombos) {
    elements.push(await createParsedComboCoreq(subCombo));
  }

  return new ParsedComboCoreq(rootCombo, elements);
}
