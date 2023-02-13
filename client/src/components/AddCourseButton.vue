<script setup lang="ts">
import { useDialog } from "primevue/usedialog";
import { h, ref } from "vue";
import Button from "primevue/button";
import { useFlow } from "@/stores/FlowStore";
import AddDegreeModal from "@/components/AddDegreeModal.vue";
import { getDegrees } from "@/services/DegreeDataService";
import { useAddDegreeModal } from "@/stores/AddDegreeModalStore";

const dialog = useDialog();
const addDegreeModal = useAddDegreeModal();
const flow = useFlow();

const showImportMajor = async () => {
  const dialogRef = dialog.open(AddDegreeModal, {
    props: {
      header: "Add a Degree",
      style: {
        width: "25vw",
      },
      breakpoints: {
        "960px": "50vw",
        "640px": "75vw",
      },
      modal: true,
    },
    data: {
      degrees: await getDegrees(),
    },
    onClose: (options) => {
      const data = options?.data;
      if (data && data.buttonType === "AddDegree") {
        flow.addDegreeToFlow(addDegreeModal.selectedDegree.id);
      }
    },
    templates: {
      footer: () => {
        return [
          h("div", { class: "flex align-content-center justify-content-center" }, [
            h(Button, {
              label: "Add Degree",
              icon: "pi pi-plus",
              onClick: () => dialogRef.close({ buttonType: "AddDegree" }),
              autofocus: true,
            }),
          ]),
        ];
      },
    },
  });
};

const buttonItems = ref([
  { label: "Add a Degree", icon: "pi pi-map", command: showImportMajor },

  {
    label: "Refresh Layout",
    icon: "pi pi-refresh",
    command: flow.layout.autoLayout,
  },
  {
    label: "Clear All",
    icon: "pi pi-times",
    command: flow.clear,
  },
]);
</script>
<template>
  <div class="flex justify-content-center">
    <PrimeSplitButton label="Add Course(s)" class="m-2" @click="flow.addInputToFlow" :model="buttonItems" />
  </div>
</template>
<style scoped></style>
