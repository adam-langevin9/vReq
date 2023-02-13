<script setup lang="ts">
import DegreeDropdown from "./DegreeDropdown.vue";
</script>
<template>
  <div class="dropdown">
    <Suspense>
      <template #default>
        <DegreeDropdown class="flex align-content-center justify-items-center" />
      </template>
      <template #fallback>
        <PrimeSkeleton class="flex align-content-center justify-items-center p-3" />
      </template>
    </Suspense>
  </div>
</template>
<style scoped>
.drowpdown {
  display: flexbox !important;
  align-content: center !important;
  justify-items: center !important;
}
</style>
