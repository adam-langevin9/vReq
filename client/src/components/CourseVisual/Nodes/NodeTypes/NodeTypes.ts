import type { NodeTypesObject, NodeComponent } from "@vue-flow/core";
import SingleNode from "./SingleNodeType.vue";
import ChildNode from "./ChildNodeType.vue";
import { markRaw } from "vue";

export const nodeTypes: NodeTypesObject = {
  single: markRaw(SingleNode) as NodeComponent,
  coreq: markRaw(ChildNode) as NodeComponent,
};
