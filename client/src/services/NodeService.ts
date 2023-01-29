import type { DetailedCombo } from "@/classes/Combo";
import { CoreqTitle, DetailedCoreq } from "@/classes/Coreq";
import type { CustomNode } from "@/classes/Nodes/Node";
import { SingleNode, ParentNode, ChildNode } from "@/classes/Nodes";
import { CustomEdge } from "@/classes/Edge";
import { AltReq, AltReqGroup } from "@/classes/AltReqGroup";
import type { Req } from "@/classes/Req";

interface ICurr {
  elm?: DetailedCoreq | DetailedCombo;
  target?: DetailedCoreq;
  edge?: Req;
  hidden: boolean;
}

function createNode(
  coreq: DetailedCoreq,
  is_manual: boolean,
  hidden: boolean = false,
  is_complete = false
): Array<CustomNode> {
  coreq = new DetailedCoreq(coreq.id, coreq.courses, coreq.prereq, coreq.precoreq);
  const newNodes: CustomNode[] = [];
  if (coreq.courses.length === 1) {
    // single node
    newNodes.push(new SingleNode({ x: 0, y: 0 }, coreq, is_manual, hidden, is_complete));
  } else {
    // nested nodes
    newNodes.push(new ParentNode({ x: 0, y: 0 }, coreq, is_manual, hidden, is_complete));
    for (let i = 0; i < coreq.courses.length; i++) {
      newNodes.push(new ChildNode(i, coreq, is_manual, hidden, is_complete));
    }
  }
  return newNodes;
}

function createAltReqGroup(detailedCoreq: DetailedCoreq): AltReqGroup {
  const altReqGroup: AltReqGroup = new AltReqGroup(detailedCoreq.id);

  for (var detailedCombo of [detailedCoreq.prereq, detailedCoreq.precoreq]) {
    // itterats throught the coreqs prereqs and precoreqs
    if (detailedCombo && detailedCombo.op === "OR" && detailedCombo.elements.length > 1) {
      altReqGroup.reqs.push(createAltReq(detailedCombo));
    }
    if (detailedCombo && detailedCombo.op === "AND") {
      for (var element of detailedCombo.elements) {
        if ("op" in element && element.op === "OR") {
          altReqGroup.reqs.push(createAltReq(detailedCombo));
        }
      }
    }
  }
  return altReqGroup;
}

function createAltReq(detailedCombo: DetailedCombo): AltReq {
  const opts: CoreqTitle[][] = [];
  // curr.precoreq has altReqs
  for (var element of detailedCombo.elements) {
    const opt: CoreqTitle[] = [];
    if ("op" in element && element.op === "AND") {
      // element is an AND combo
      for (var subelement of element.elements) {
        if ("courses" in subelement) {
          // subelement is a coreq
          opt.push(new CoreqTitle(subelement));
        }
      }
      opts.push(opt);
    } else if ("courses" in element) {
      // element is a coreq
      opts.push([new CoreqTitle(element)]);
    }
  }
  return new AltReq(opts, opts[0]);
}

export module NodeFactory {
  export function createNodes(coreq: DetailedCoreq): {
    nodes: Array<CustomNode>;
    edges: Array<CustomEdge>;
  } {
    const nodes: Array<CustomNode> = [];
    const edges: Array<CustomEdge> = [];

    if (!coreq) {
      return { nodes, edges };
    }

    const stack: Array<ICurr> = [];
    var curr: ICurr | undefined = { elm: coreq, hidden: false };

    nodes.push(...createNode(coreq, true));

    if ((curr.elm as DetailedCoreq).precoreq) {
      stack.push({
        elm: (curr.elm as DetailedCoreq).precoreq!,
        target: curr.elm as DetailedCoreq,
        edge: "precoreq",
        hidden: false,
      });
    }

    while (stack.length || curr) {
      if (curr && curr.elm) {
        if ("op" in curr.elm) {
          if (curr.elm.op === "OR") {
            for (var i = 0; i < curr.elm.elements.length; i++) {
              if (i === 0) {
                stack.push({ elm: curr.elm.elements[i], target: curr.target, edge: curr.edge, hidden: false });
              } else {
                stack.push({ elm: curr.elm.elements[i], target: curr.target, edge: curr.edge, hidden: true });
              }
            }
          } else {
            curr.elm.elements.forEach((subElm) =>
              stack.push({ elm: subElm, target: curr!.target, edge: curr?.edge, hidden: false })
            );
          }
          curr = stack.pop();
        } else {
          if (!nodes.map((node) => node.id).includes(curr.elm.id.toString())) {
            nodes.push(...createNode(curr.elm, false, curr.hidden));
          }

          if (
            curr.target &&
            curr.edge &&
            !edges
              .map((edge) => edge.id)
              .includes(CustomEdge.createEdgeID(curr.elm.id.toString(), curr.target.id.toString()))
          ) {
            edges.push(new CustomEdge(curr.elm.id.toString(), curr.target.id.toString(), curr.edge));
          }

          const altReqGroup = createAltReqGroup(curr.elm);
          const targetNode = nodes.find((node) => node.id === altReqGroup.targetID.toString());
          if (altReqGroup.reqs.length > 0 && targetNode && targetNode.data.altReqs.length === 0) {
            targetNode.data.altReqs.push(...altReqGroup.reqs);
          }

          if (curr.elm.precoreq) {
            stack.push({ elm: curr.elm.precoreq, target: curr.elm, edge: "precoreq", hidden: curr.hidden });
          }
          curr = { elm: curr.elm.prereq, target: curr.elm, edge: "prereq", hidden: curr.hidden };
        }
      } else {
        curr = stack.pop();
      }
    }
    return { nodes, edges };
  }
}
