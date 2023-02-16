<script setup lang="ts">
import type { ListingDataDTO } from "@/services/FlowDataService";

type DetailedCourseProp = { listings: Array<ListingDataDTO>; selectedListing: number };

const props = defineProps<{
  detailedCourse: DetailedCourseProp;
  complete: boolean;
}>();
const optionLabel = (option: ListingDataDTO) => option.subj.concat(" ").concat(option.num.toString());
const optionValue = (option: ListingDataDTO) => props.detailedCourse.listings.indexOf(option);
</script>

<template>
  <div v-if="detailedCourse.listings.length > 1" class="justify-content-left">
    <PrimeDropdown
      v-model="props.detailedCourse.selectedListing"
      :options="detailedCourse.listings"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      class="crosslisting"
      :inputStyle="complete ? 'text-decoration: line-through' : ''"
    />
  </div>
  <div v-else class="single-listing justify-content-center" :style="complete ? 'text-decoration: line-through' : ''">
    {{ optionLabel(detailedCourse.listings[detailedCourse.selectedListing]) }}
  </div>
</template>

<style scoped>
.single-listing {
  padding: 0.75rem;
  min-width: 6rem;
}
.crosslisting:hover {
  background: rgba(100, 116, 139, 0.04);
}
.crosslisting:deep(.p-inputtext) {
  padding: 0.75rem 0.25rem 0.75rem 0.25rem !important;
  text-align: left;
}
.crosslisting:deep(.p-inputtext) {
  border-radius: 0 !important;
  width: 6rem !important;
}
.crosslisting:deep(.p-dropdown-trigger-icon.pi.pi-chevron-down) {
  position: relative;
  right: 0.75rem;
}
.p-dropdown:not(.p-focus),
.crosslisting:deep(.p-dropdown .p-disabled) {
  border-width: 0 !important;
  box-shadow: unset !important;
  border-color: transparent !important;
  min-width: 6rem !important;
}
.crosslisting:deep(.p-dropdown-trigger) {
  width: 0 !important;
}
.start {
  padding-left: 0.75rem;
}
</style>
