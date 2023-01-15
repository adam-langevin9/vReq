import type { NodeTypesObject, NodeComponent } from "@vue-flow/core";
import SingleReqNode from "./SingleReqNodeType.vue";
import CoreqNode from "./CoreqNodeType.vue";
import { markRaw } from "vue";

export const nodeTypes: NodeTypesObject = {
  single: markRaw(SingleReqNode) as NodeComponent,
  coreq: markRaw(CoreqNode) as NodeComponent,
};
