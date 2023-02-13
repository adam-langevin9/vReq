<script setup lang="ts">
import { useAddDegreeModal } from "@/stores/AddDegreeModalStore";

const addDegreeModal = useAddDegreeModal();
addDegreeModal.fillDegrees();
</script>
<template>
  <PrimeDropdown
    v-model="addDegreeModal.selectedDegree"
    :options="addDegreeModal.degrees"
    optionLabel="title"
    placeholder="Select a Degree"
  />
</template>
<style scoped></style>
