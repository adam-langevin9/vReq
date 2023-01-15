<script lang="ts">
import { Listing } from "../../../../classes/Listing";
export default {
  props: {
    listing: {
      type: Listing,
      required: true,
    },
  },
};
</script>

<template>
  <div v-if="listing.crosslistings.length > 1">
    <PrimeDropdown
      v-model="listing.selectedListing"
      :options="listing.crosslistings"
      dropdownIcon=""
      class="crosslisting"
    />
  </div>
  <div v-else class="single-listing">{{ listing.selectedListing }}</div>
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
