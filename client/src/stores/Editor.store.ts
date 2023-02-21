import type { CustomNode } from "@/classes/CustomNode";
import { getCourseFor, type CourseDTO } from "@/services/CourseDataService";
import { getDegrees } from "@/services/DegreeDataService";
import { type CourseDataDTO, getCoreqFlow, getDegreeFlow } from "@/services/FlowDataService";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { useCourseFlow } from "./CourseFlow.store";

export const useEditor = defineStore("Editor", () => {
  const courseFlow = useCourseFlow();

  const courseInput = ref({ subj: "", num: "" });
  const searchResult: Ref<CourseDTO | undefined> = ref();
  const isLoadingFlow = ref(false);
  const degrees = ref();
  const selectedDegree = ref();

  async function fillDegrees(): Promise<void> {
    degrees.value = await getDegrees();
  }

  async function retrieveCourse(): Promise<void> {
    searchResult.value = await getCourseFor(courseInput.value.subj, +courseInput.value.num);
  }

  async function addCourseToFlow(): Promise<void> {
    isLoadingFlow.value = true;
    const flow = await getCoreqFlow(courseInput.value.subj, +courseInput.value.num);
    if (flow) {
      postNodes(flow.nodes);
      courseFlow.addEdges(flow.edges);
    }
    isLoadingFlow.value = false;
  }

  async function addDegreeToFlow(): Promise<void> {
    isLoadingFlow.value = true;
    const flow = await getDegreeFlow(selectedDegree.value.id);
    if (flow) {
      postNodes(flow.nodes);
      courseFlow.addEdges(flow.edges);
    }
    isLoadingFlow.value = false;
  }

  function searchLoaded(course: CourseDataDTO): void {
    courseInput.value = {
      subj: course.listings[course.selectedListing].subj,
      num: course.listings[course.selectedListing].num.toString(),
    };
    searchResult.value = { title: course.title, hours: course.hours, descr: course.descr };
  }

  function postNodes(newNodes: CustomNode[]): void {
    const uniqueNodes: CustomNode[] = [];
    newNodes.forEach((newNode) => {
      const existingNode = courseFlow.findNode(newNode.id);
      if (existingNode && "courses" in newNode.data) {
        existingNode.data.manual = existingNode.data.manual ? existingNode.data.manual : newNode.data.manual;
        existingNode.data.hidden = existingNode.data.hidden ? newNode.data.hidden : existingNode.data.hidden;
      } else {
        uniqueNodes.push(newNode);
      }
    });
    courseFlow.addNodes(uniqueNodes);
  }

  function clear(): void {
    courseFlow.setEdges([]);
    courseFlow.setNodes([]);
  }
  return {
    degrees,
    selectedDegree,
    isLoadingFlow,
    courseInput,
    searchResult,
    fillDegrees,
    retrieveCourse,
    addCourseToFlow,
    addDegreeToFlow,
    searchLoaded,
    clear,
  };
});
