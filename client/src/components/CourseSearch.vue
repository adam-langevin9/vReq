<script setup lang="ts">
import { useCourseInput } from "@/stores/CourseInputStore";
const CourseFlowStore = useCourseInput();
</script>
<template>
  <div id="course-search" class="flex justify-content-center flex-wrap card-container mt-5">
    <div style="max-width: 575px" class="grid p-fluid">
      <div class="col-4 p-2">
        <span class="p-float-label">
          <PrimeInputMask
            id="subject"
            class="max-w-12rem"
            v-model="CourseFlowStore.input.subj"
            mask="aaa?a"
            slotChar=""
            style="text-transform: uppercase"
          />
          <label for="subject">Course Subject</label>
        </span>
      </div>

      <div class="col-4 p-2">
        <span class="p-float-label">
          <PrimeInputMask id="number" class="max-w-12rem" v-model="CourseFlowStore.input.num" mask="999" slotChar="" />
          <label for="number">Course Number</label>
        </span>
      </div>

      <div class="col-4 p-2">
        <PrimeButton
          @click="CourseFlowStore.retrieveCourse"
          label="Search"
          icon="pi pi-search"
          iconPos="right"
          class="p-button-secondary"
        />
      </div>
      <PrimeCard v-if="CourseFlowStore.isNew" class="m-2 flex-grow-1">
        <!-- Welcome Message -->
        <template #content>
          To get started, enter a course's subject and number into the fields above.
          <br /><br />
          Then you can select:
          <ul>
            <li>
              <strong><em>Search</em></strong> to load the course's description or
            </li>
            <br />
            <li>
              <strong><em>Add Course(s)</em></strong> to add the course and its requirements to the visualization below
            </li>
          </ul>
        </template>
      </PrimeCard>
      <PrimeCard v-else-if="CourseFlowStore.searchResult">
        <!-- Search Result -->
        <template #title>
          {{ CourseFlowStore.searchResult.title }}
        </template>
        <template #subtitle
          ><span v-if="CourseFlowStore.searchResult.hours">Credit Hours:</span>
          {{ CourseFlowStore.searchResult.hours }}
        </template>
        <template #content>
          {{ CourseFlowStore.searchResult.descr }}
        </template>
      </PrimeCard>
      <PrimeCard v-else>
        <!-- Error Message -->
        <template #title> Course Not Found </template>
        <template #content>
          {{ CourseFlowStore.input.subj.toUpperCase() }} {{ CourseFlowStore.input.num }} could not be found. Please
          check that you entered the course correctly or try a different course.
        </template>
      </PrimeCard>
    </div>
  </div>
  {{ CourseFlowStore.searchResult?.getListingsString() }}
</template>
