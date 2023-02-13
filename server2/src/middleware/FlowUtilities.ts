import { getRecentReq } from "./ReqUtilities";
import { Coreq, Course, Degree, Listing } from "../models/init-models";
import { isParsedComboCoreq, createParsedComboCoreq, ParsedComboCoreq } from "./ParsedComboCoreqFactory";

type DegreeFlowComponents = {
  edges: Array<EdgeData>;
  nodes: Array<CoreqNodeData | DegreeNodeData>;
};

type CoreqFlowComponents = {
  edges: Array<EdgeData>;
  nodes: Array<CoreqNodeData>;
};

export const getDegreeFlow = async (targetDegree: Degree, startYear?: number): Promise<DegreeFlowComponents> => {
  const edges: EdgeData[] = [];
  const nodes: Array<DegreeNodeData | CoreqNodeData> = [new DegreeNodeData(targetDegree)];
  const req = await getRecentReq(targetDegree.req.id, startYear);
  const parsedComboCoreq = await createParsedComboCoreq(req.combo);
  const leafCoreqs = parsedComboCoreq.leafCoreqs;
  const ancestry = (
    await Promise.all(
      leafCoreqs.map(
        async (leafCoreq): Promise<CoreqFlowComponents> =>
          await createCoreqComponents(leafCoreq, false, undefined, startYear)
      )
    )
  ).reduce(
    (acc, curr) => {
      return { edges: acc.edges.concat(curr.edges), nodes: acc.nodes.concat(curr.nodes) };
    },
    { edges: [], nodes: [] }
  );
  edges.push(
    ...initializeSelectedOptions(
      uniqueIDs(createEdges(targetDegree, "prereq", parsedComboCoreq).concat(ancestry.edges))
    )
  );

  nodes.push(...uniqueIDs(ancestry.nodes));
  return { edges, nodes };
};

export const getCoreqFlow = async (
  coreq: Coreq,
  inputListing?: Listing,
  startYear?: number
): Promise<CoreqFlowComponents> => {
  const { edges, nodes } = await createCoreqComponents(coreq, true, inputListing, startYear);
  return { edges: initializeSelectedOptions(uniqueIDs(edges)), nodes: uniqueIDs(nodes) };
};

const initializeSelectedOptions = (edges: Array<EdgeData>) => {
  const altEdges = edges.filter((edge) => edge.altCombo);
  for (var i = 0; i < altEdges.length; i++) {
    altEdges[i].altCombo!.selectedOptionID = altEdges.filter(
      (otherEdge) => otherEdge.altCombo!.comboID === altEdges[i].altCombo!.comboID
    )[0].altCombo!.optionID;
  }
  return edges;
};

function uniqueIDs(data: Array<CoreqNodeData>): Array<CoreqNodeData>;
function uniqueIDs(data: Array<EdgeData>): Array<EdgeData>;
function uniqueIDs(data: Array<CoreqNodeData | EdgeData>): Array<CoreqNodeData | EdgeData> {
  return data.reduce(
    (acc, curr) => (acc.map((accItem) => accItem.id).includes(curr.id) ? acc : [...acc, curr]),
    new Array<CoreqNodeData | EdgeData>()
  );
}

const createCoreqComponents = async (
  targetCoreq: Coreq,
  isRoot: boolean,
  inputListing?: Listing,
  startYear?: number
): Promise<CoreqFlowComponents> => {
  const edges: EdgeData[] = [];
  const nodes: CoreqNodeData[] = [new CoreqNodeData(targetCoreq, inputListing, isRoot)];
  const prereq = await targetCoreq.getPrereq();
  if (prereq) {
    const req = await getRecentReq(prereq.id, startYear);
    if (req) {
      const parsedComboCoreq = await createParsedComboCoreq(req.combo);
      const leafCoreqs = parsedComboCoreq.leafCoreqs;
      const ancestry = (
        await Promise.all(
          leafCoreqs.map(
            async (leafCoreq): Promise<CoreqFlowComponents> =>
              await createCoreqComponents(leafCoreq, false, inputListing, startYear)
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
            async (leafCoreq): Promise<CoreqFlowComponents> =>
              await createCoreqComponents(leafCoreq, false, inputListing, startYear)
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
  target: Coreq | Degree,
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
        edges.push(...createEdges(target, type, element, parsedComboCoreq.id, element.id));
      } else {
        edges.push(...createEdges(target, type, element, comboID, optionID));
      }
    } else {
      // element is a Coreq
      if (parsedComboCoreq.op === "OR") {
        edges.push(new EdgeData(target, type, element, parsedComboCoreq.id, element.id));
      } else {
        edges.push(new EdgeData(target, type, element, comboID, optionID));
      }
    }
  }
  return edges;
};

class DegreeNodeData {
  id: string;
  title: string;
  otherReqs?: string;
  manual: boolean;

  constructor(degree: Degree) {
    this.id = "d".concat(degree.id.toString());
    this.title = degree.title;
    this.otherReqs = degree.other_reqs;
    this.manual = true;
  }
}

class CoreqNodeData {
  id: string;
  courses: CourseData[];
  manual: boolean;
  constructor(coreq: Coreq, inputListing?: Listing, manual: boolean = false) {
    this.id = "c".concat(coreq.id.toString());
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

  constructor(course: Course, inputListing?: Listing) {
    this.id = course.id;
    this.title = course.title;
    this.descr = course.descr;
    this.hours = course.hours;
    this.listings = course.listings.map((listing) => {
      return { id: listing.id, subj: listing.subj, num: listing.num };
    });
    this.selectedListing = this.findSelectedIndex(inputListing);
  }

  private readonly findSelectedIndex = (inputListing?: Listing): number => {
    if (inputListing) {
      const exactMatch = this.listings.findIndex((listing) => listing.id === inputListing.id);
      if (exactMatch !== -1) {
        return exactMatch;
      }
      const subjMatch = this.listings.findIndex((listing) => listing.subj === inputListing.subj);
      if (subjMatch !== -1) {
        return subjMatch;
      }
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
  target: string;
  source: string;
  animated: boolean;
  altCombo?: AltCombo;

  private static createEdgeID = (source: Coreq, target: Coreq | Degree): string =>
    "c" + source.id.toString() + "-" + EdgeData.getTargetID(target);

  private static getTargetID = (target: Coreq | Degree) =>
    "prereq_id" in target ? "c" + target.id.toString() : "d" + target.id.toString();

  private static getSourceID = (target: Coreq) => "c" + target.id.toString();

  constructor(target: Coreq | Degree, type: "prereq" | "precoreq", source: Coreq, comboID?: number, optionID?: number) {
    this.id = EdgeData.createEdgeID(source, target);
    this.source = EdgeData.getSourceID(source);
    this.target = EdgeData.getTargetID(target);
    this.animated = type === "precoreq";
    if (comboID && optionID) {
      this.altCombo = { comboID, optionID };
    }
  }
}
