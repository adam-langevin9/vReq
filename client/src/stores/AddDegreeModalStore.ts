import { getDegrees } from "@/services/DegreeDataService";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";

export const useAddDegreeModal = defineStore("AddDegree", () => {
  const degrees = ref();
  const selectedDegree = ref();

  const fillDegrees = async () => {
    degrees.value = await getDegrees();
  };

  return { degrees, selectedDegree, fillDegrees };
});
