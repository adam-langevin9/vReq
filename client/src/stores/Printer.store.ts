import { defineStore } from "pinia";
import { ref } from "vue";

export const usePrinter = defineStore("Printer", () => {
  const includeDescr = ref(false);
  const isColor = ref(true);

  function print() {
    window.print();
  }
  return {
    includeDescr,
    isColor,
    print,
  };
});
