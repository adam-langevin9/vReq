<script setup lang="ts">
import type { Listing } from "@/classes/Listing";
defineProps<{
  detailedCourse: {
    [x: string]: any;
    type: { listings: Listing[]; selectedListing: number };
    required: true;
  };
}>();
</script>

<script lang="ts">
export default {
  data() {
    return {
      selection: this.listingObjToString(this.detailedCourse.listings[this.detailedCourse.selectedListing]),
      options: this.detailedCourse.listings.map((listing: Listing) =>
        listing.subj.concat(" ").concat(listing.num.toString())
      ),
    };
  },
  methods: {
    listingObjToString(listing: Listing) {
      return listing.subj.concat(" ").concat(listing.num.toString());
    },
  },
};
</script>

<template>
  <div v-if="detailedCourse.listings.length > 1">
    <PrimeDropdown v-model="selection" :options="options" dropdownIcon="" class="crosslisting" />
  </div>
  <div v-else class="single-listing">
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
