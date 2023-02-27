import type { CustomEdge } from "@/classes/CustomEdge";
import type { CustomNode } from "@/classes/CustomNode";
import { getCourseFor, type CourseDTO } from "@/services/CourseDataService";
import { getDegrees } from "@/services/DegreeDataService";
import { type CourseDataDTO, getCoreqFlow, getDegreeFlow } from "@/services/FlowDataService";
import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";
import { ref, watch, type Ref } from "vue";
import { useCourseFlow } from "./CourseFlow.store";

export const useEditor = defineStore("Editor", () => {
  // stores
  const courseFlow = useCourseFlow();
  const toast = useToast();

  // state
  const searchResult: Ref<CourseDTO | undefined> = ref();
  const isLoadingFlow = ref(false);
  const degrees = ref();

  // toast actions
  function _showAddCourseSuccess(subj: string, num: number) {
    toast.add({
      severity: "success",
      summary: "New Course Added",
      detail: `${subj.toUpperCase()} ${num}`,
      life: 3000,
    });
  }
  function _showAddCoursePresent(subj: string, num: number) {
    toast.add({
      severity: "info",
      summary: "Course Already Present",
      detail: `${subj.toUpperCase()} ${num}`,
      life: 3000,
    });
  }
  function _showAddCourseFailure() {
    toast.add({
      severity: "error",
      summary: "Add Course Failed",
      detail: "We are unable to add this course at this time. Please try again later.",
      life: 3000,
    });
  }
  function _showAddDegreeSuccess(title: string) {
    toast.add({
      severity: "success",
      summary: "New Degree Requirements Added",
      detail: `${title}`,
      life: 3000,
    });
  }
  function _showAddDegreePresent(title: string) {
    toast.add({
      severity: "info",
      summary: "Degree Requirements Already Present",
      detail: `${title}`,
      life: 3000,
    });
  }
  function _showAddDegreeFailure() {
    toast.add({
      severity: "error",
      summary: "Add Course Failed",
      detail: "We are unable to add this course at this time. Please try again later.",
      life: 3000,
    });
  }
  function _showRemoveAllSuccess() {
    toast.add({
      severity: "success",
      summary: "All Courses Removed",
      life: 3000,
    });
  }

  // actions
  async function fillDegrees(): Promise<void> {
    degrees.value = await getDegrees();
  }
  async function retrieveCourse(subj: string, num: number): Promise<void> {
    searchResult.value = await getCourseFor(subj, num);
  }
  async function addCourseToFlow(subj: string, num: number): Promise<void> {
    isLoadingFlow.value = true;
    const flow = await getCoreqFlow(subj, num);
    if (flow) {
      const prevManualNodeCount = courseFlow.getManualNodes.length;
      upsertNodes(flow.nodes);
      upsertEdges(flow.edges);
      if (courseFlow.newNodes(flow.nodes).length > 0 || courseFlow.getManualNodes.length > prevManualNodeCount)
        _showAddCourseSuccess(subj, num);
      else _showAddCoursePresent(subj, num);
    } else _showAddCourseFailure();
    isLoadingFlow.value = false;
  }
  async function addDegreeToFlow(degree: { id: number; title: string }): Promise<void> {
    isLoadingFlow.value = true;
    const flow = await getDegreeFlow(degree.id);
    if (flow) {
      const prevManualNodeCount = courseFlow.getManualNodes.length;
      upsertNodes(flow.nodes);
      upsertEdges(flow.edges);
      if (courseFlow.newNodes(flow.nodes).length > 0 || courseFlow.getManualNodes.length > prevManualNodeCount)
        _showAddDegreeSuccess(degree.title);
      else _showAddDegreePresent(degree.title);
    } else _showAddDegreeFailure();
    isLoadingFlow.value = false;
  }
  function searchLoaded(course: CourseDataDTO): void {
    searchResult.value = { title: course.title, hours: course.hours, descr: course.descr };
  }
  function upsertNodes(newNodes: CustomNode[]) {
    const uniqueNodes: CustomNode[] = [];
    newNodes.forEach((newNode) => {
      const existingNode = courseFlow.findNode(newNode.id);
      if (existingNode && "courses" in newNode.data) {
        existingNode.data.manual = existingNode.data.manual ? existingNode.data.manual : newNode.data.manual;
        existingNode.data.hidden = existingNode.data.hidden ? newNode.data.hidden : existingNode.data.hidden;
      } else if ("courses" in newNode.data) {
        uniqueNodes.push(newNode);
      } else if (!existingNode) {
        uniqueNodes.push(newNode);
      }
    });
    courseFlow.addNodes(uniqueNodes);
  }
  function upsertEdges(newEdges: CustomEdge[]): void {
    const uniqueEdges: CustomEdge[] = [];
    newEdges.forEach((newEdge) => {
      const existingEdge = courseFlow.findEdge(newEdge.id);
      if (!existingEdge) uniqueEdges.push(newEdge);
    });
    courseFlow.addEdges(uniqueEdges);
  }
  function clear(notify: boolean = true): void {
    courseFlow.setEdges([]);
    courseFlow.setNodes([]);
    if (notify) _showRemoveAllSuccess();
  }
  return {
    degrees,
    isLoadingFlow,
    searchResult,
    fillDegrees,
    retrieveCourse,
    addCourseToFlow,
    addDegreeToFlow,
    searchLoaded,
    clear,
  };
});
