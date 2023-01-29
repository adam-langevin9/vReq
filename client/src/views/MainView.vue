<script setup lang="ts">
import CourseSearch from "../components/CourseSearch.vue";
import CourseFlow from "../components/CourseFlow/CourseFlow.vue";
import AltSelector from "@/components/AltSelector.vue";
import { useCourseFlow } from "@/stores/CoursFlowStore";

const courseFlow = useCourseFlow();
</script>

<template>
  <main>
    <CourseSearch />
    <div class="flex justify-content-center">
      <PrimeButton label="Add Course(s)" icon="pi" iconPos="right" class="m-2" @click="courseFlow.addInputToFlow" />
    </div>
    <CourseFlow />
    <AltSelector />
  </main>
</template>
