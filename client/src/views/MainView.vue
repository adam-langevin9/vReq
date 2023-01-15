<script setup lang="ts">
import CourseSearch from "../components/CourseSearch.vue";
import CourseVisual from "../components/CourseVisual/CourseVisual.vue";
</script>

<template>
  <main>
    <CourseSearch />
    <div class="flex justify-content-center">
      <PrimeButton label="Add Course(s)" icon="pi" iconPos="right" class="m-2" />
    </div>
    <CourseVisual />
  </main>
</template>
