import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMenuDock = defineStore("Menus", () => {
  const displayUser = ref(false);
  const displayDirections = ref(false);
  const displayAddCourses = ref(false);
  const displayAlternative = ref(false);
  const displayFile = ref(false);
  const displayMenu = computed(
    () =>
      displayUser.value ||
      displayDirections.value ||
      displayAddCourses.value ||
      displayAlternative.value ||
      displayFile.value
  );

  const toggleUser = () => {
    displayUser.value = !displayUser.value;
    displayDirections.value = false;
    displayAddCourses.value = false;
    displayAlternative.value = false;
    displayFile.value = false;
  };
  const toggleDirections = () => {
    displayUser.value = false;
    displayDirections.value = !displayDirections.value;
    displayAddCourses.value = false;
    displayAlternative.value = false;
    displayFile.value = false;
  };
  const toggleAddCourses = () => {
    displayUser.value = false;
    displayDirections.value = false;
    displayAddCourses.value = !displayAddCourses.value;
    displayAlternative.value = false;
    displayFile.value = false;
  };
  const toggleAlternative = () => {
    displayUser.value = false;
    displayDirections.value = false;
    displayAddCourses.value = false;
    displayAlternative.value = !displayAlternative.value;
    displayFile.value = false;
  };
  const toggleFile = () => {
    displayUser.value = false;
    displayDirections.value = false;
    displayAddCourses.value = false;
    displayAlternative.value = false;
    displayFile.value = !displayFile.value;
  };

  return {
    displayUser,
    displayDirections,
    displayAddCourses,
    displayAlternative,
    displayFile,
    displayMenu,
    toggleUser,
    toggleDirections,
    toggleAddCourses,
    toggleAlternative,
    toggleFile,
  };
});
