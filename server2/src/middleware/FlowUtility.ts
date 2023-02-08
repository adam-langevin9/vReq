import { getRecentReq } from "./ReqUtility";
import { Coreq, Course, Listing } from "../models/init-models";
import { isParsedComboCoreq, createParsedComboCoreq, ParsedComboCoreq } from "./ParsedComboCoreqFactory";

interface FlowComponents {
  edges: Array<EdgeData>;
  nodes: Array<NodeData>;
}

export const initializeSelectedOptions = (edges: Array<EdgeData>) => {
  const altEdges = edges.filter((edge) => edge.altCombo);
  for (var i = 0; i < altEdges.length; i++) {
    altEdges[i].altCombo!.selectedOptionID = altEdges.filter(
      (otherEdge) => otherEdge.altCombo!.comboID === altEdges[i].altCombo!.comboID
    )[0].altCombo!.optionID;
  }
};

export const getFlow = async (inputListing: Listing, startYear?: number): Promise<FlowComponents> => {
  const { edges, nodes } = await createComponenets(inputListing.course.coreq, true, inputListing, startYear);
  return { edges: uniqueIDs(edges), nodes: uniqueIDs(nodes) };
};

function uniqueIDs(data: Array<NodeData>): Array<NodeData>;
function uniqueIDs(data: Array<EdgeData>): Array<EdgeData>;
function uniqueIDs(data: Array<NodeData | EdgeData>): Array<NodeData | EdgeData> {
  return data.reduce(
    (acc, curr) => (acc.map((accItem) => accItem.id).includes(curr.id) ? acc : [...acc, curr]),
    new Array<NodeData | EdgeData>()
  );
}

const createComponenets = async (
  targetCoreq: Coreq,
  isRoot: boolean,
  inputListing: Listing,
  startYear?: number
): Promise<FlowComponents> => {
  const edges: EdgeData[] = [];
  const nodes: NodeData[] = [new NodeData(targetCoreq, inputListing, isRoot)];
  const prereq = await targetCoreq.getPrereq();
  if (prereq) {
    const req = await getRecentReq(prereq.id, startYear);
    if (req) {
      const parsedComboCoreq = await createParsedComboCoreq(req.combo);
      const leafCoreqs = parsedComboCoreq.leafCoreqs;
      const ancestry = (
        await Promise.all(
          leafCoreqs.map(
            async (leafCoreq): Promise<FlowComponents> =>
              await createComponenets(leafCoreq, false, inputListing, startYear)
          )
        )
      ).reduce(
        (acc, curr) => {
          return { edges: acc.edges.concat(curr.edges), nodes: acc.nodes.concat(curr.nodes) };
        },
        { edges: [], nodes: [] }
      );
      edges.push(...createEdges(targetCoreq, "prereq", parsedComboCoreq).concat(ancestry.edges));
      nodes.push(...ancestry.nodes);
    }
  }
  const precoreq = await targetCoreq.getPrecoreq();
  if (precoreq) {
    const req = await getRecentReq(precoreq.id, startYear);
    if (req) {
      const parsedComboCoreq = await createParsedComboCoreq(req.combo);
      const leafCoreqs = parsedComboCoreq.leafCoreqs;
      const ancestry = (
        await Promise.all(
          leafCoreqs.map(
            async (leafCoreq): Promise<FlowComponents> =>
              await createComponenets(leafCoreq, false, inputListing, startYear)
          )
        )
      ).reduce(
        (acc, curr) => {
          return { edges: acc.edges.concat(curr.edges), nodes: acc.nodes.concat(curr.nodes) };
        },
        { edges: [], nodes: [] }
      );
      edges.push(...createEdges(targetCoreq, "precoreq", parsedComboCoreq).concat(ancestry.edges));
      nodes.push(...ancestry.nodes);
    }
  }
  return { edges, nodes };
};

const createEdges = (
  targetCoreq: Coreq,
  type: "prereq" | "precoreq",
  parsedComboCoreq: ParsedComboCoreq,
  comboID?: number,
  optionID?: number
): EdgeData[] => {
  const edges: EdgeData[] = [];
  for (const element of parsedComboCoreq.elements) {
    if (isParsedComboCoreq(element)) {
      // element is a ParsedComboCoreq

      if (parsedComboCoreq.op === "OR") {
        edges.push(...createEdges(targetCoreq, type, element, parsedComboCoreq.id, element.id));
      } else {
        edges.push(...createEdges(targetCoreq, type, element, comboID, optionID));
      }
    } else {
      // element is a Coreq
      if (parsedComboCoreq.op === "OR") {
        edges.push(new EdgeData(targetCoreq.id, type, element.id, parsedComboCoreq.id, element.id));
      } else {
        edges.push(new EdgeData(targetCoreq.id, type, element.id, comboID, optionID));
      }
    }
  }
  return edges;
};

class NodeData {
  id: number;
  courses: CourseData[];
  manual: boolean;

  constructor(coreq: Coreq, inputListing: Listing, manual: boolean) {
    this.id = coreq.id;
    this.courses = coreq.courses.map((course) => new CourseData(course, inputListing));
    this.manual = manual;
  }
}

type ListingData = Pick<Listing, "id" | "subj" | "num">;

class CourseData {
  id: number;
  title: string;
  descr: string;
  hours: string;
  listings: ListingData[];
  selectedListing: number;

  constructor(course: Course, inputListing: Listing) {
    this.id = course.id;
    this.title = course.title;
    this.descr = course.descr;
    this.hours = course.hours;
    this.listings = course.listings.map((listing) => {
      return { id: listing.id, subj: listing.subj, num: listing.num };
    });
    this.selectedListing = this.findSelectedIndex(inputListing);
  }

  private readonly findSelectedIndex = (inputListing: Listing): number => {
    const exactMatch = this.listings.findIndex((listing) => listing.id === inputListing.id);
    if (exactMatch !== -1) {
      return exactMatch;
    }
    const subjMatch = this.listings.findIndex((listing) => listing.subj === inputListing.subj);
    if (subjMatch !== -1) {
      return subjMatch;
    }
    return 0;
  };
}

interface AltCombo {
  comboID: number;
  optionID: number;
  selectedOptionID?: number;
}

class EdgeData {
  id: string;
  target: number;
  source: number;
  animated: boolean;
  altCombo?: AltCombo;

  static createEdgeID(source: string, target: string): string;
  static createEdgeID(source: number, target: number): string;
  static createEdgeID(source: number | string, target: number | string): string {
    return source.toString().concat("-").concat(target.toString());
  }

  constructor(target: number, type: "prereq" | "precoreq", source: number, comboID?: number, optionID?: number) {
    this.id = EdgeData.createEdgeID(source, target);
    this.source = source;
    this.target = target;
    this.animated = type === "precoreq";
    if (comboID && optionID) {
      this.altCombo = { comboID, optionID };
    }
  }
}
