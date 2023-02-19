import type { VisualDTO } from "@/services/VisualDataService";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { useCourseFlow } from "../CourseFlow.store";
import { createVisual } from "@/services/VisualDataService";
import { useUser } from "../User.store";

export const useFileMenu = defineStore("EditorMenu", () => {
  const courseFlow = useCourseFlow();
  const user = useUser();

  const visuals: Ref<VisualDTO[]> = ref([
    { id: 1234, title: "test", start_year: 2022, elements: [] as string[] },
    {
      id: 5678,
      title: "test2",
      start_year: 2022,
      elements: ['{"Nodes":[{"name":"node1"},{"name":"node2"}],"Edges":[{"name":"e1-2"}]}'] as string[],
    },
  ]);
  const title = ref();

  const save = async (): Promise<void> => {
    const visual = {
      title: title.value,
      start_year: courseFlow.startYear,
      elements: courseFlow.toObject(),
    };
    if (!user.id) return;
    const response = await createVisual(
      title.value,
      user.id,
      courseFlow.startYear,
      JSON.stringify(courseFlow.toObject())
    );
  };

  return { visuals, title };
});
