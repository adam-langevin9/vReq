import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAltSelector = defineStore("AltSelector", () => {
  const visible = ref(false);
  const position = ref("right");

  const isOpenThird = computed(() => visible.value && position.value === "right");

  return { visible, position, isOpenThird };
});
