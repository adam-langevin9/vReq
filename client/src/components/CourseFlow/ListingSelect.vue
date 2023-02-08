<script setup lang="ts">
import type { ListingFlowDTO } from "@/services/FlowDataService";

defineProps<{
  detailedCourse: { listings: Array<ListingFlowDTO>; selectedListing: number };
  complete: boolean;
}>();
</script>

<script lang="ts">
export default {
  data() {
    return {
      selection: this.listingObjToString(this.detailedCourse.listings[this.detailedCourse.selectedListing]),
      options: this.detailedCourse.listings.map((listing: ListingFlowDTO) =>
        listing.subj.concat(" ").concat(listing.num.toString())
      ),
    };
  },
  methods: {
    listingObjToString(listing: ListingFlowDTO) {
      return listing.subj.concat(" ").concat(listing.num.toString());
    },
  },
};
</script>

<template>
  <div v-if="detailedCourse.listings.length > 1" class="justify-content-left">
    <PrimeDropdown
      v-model="selection"
      :options="options"
      class="crosslisting"
      :inputStyle="complete ? 'text-decoration: line-through' : ''"
    />
  </div>
  <div v-else class="single-listing justify-content-center" :style="complete ? 'text-decoration: line-through' : ''">
    {{ selection }}
  </div>
</template>

<style>
.single-listing {
  padding: 0.75rem;
  min-width: 6rem;
}
.crosslisting:hover {
  background: rgba(100, 116, 139, 0.04);
}
.p-inputtext {
  padding: 0.75rem 0.25rem 0.75rem 0.25rem !important;
  text-align: left;
}
.p-dropdown .p-inputtext {
  border-radius: 0 !important;
  width: 6rem !important;
}
.p-dropdown-trigger-icon.pi.pi-chevron-down {
  position: relative;
  right: 0.75rem;
}
.p-dropdown:not(.p-focus),
.p-dropdown.p-disabled {
  border-width: 0 !important;
  box-shadow: unset !important;
  border-color: transparent !important;
  min-width: 6rem !important;
}
.p-dropdown .p-dropdown-trigger {
  width: 0 !important;
}
.start {
  padding-left: 0.75rem;
}
</style>
