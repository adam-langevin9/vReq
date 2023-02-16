import { getDegrees } from "@/services/DegreeDataService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useEditorMenu = defineStore("EditorMenu", () => {
  const degrees = ref();
  const selectedDegree = ref();

  const fillDegrees = async (): Promise<void> => {
    degrees.value = await getDegrees();
  };

  return { degrees, selectedDegree, fillDegrees };
});
