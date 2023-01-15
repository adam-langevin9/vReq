<script lang="ts">
import CourseDataService from "../services/CourseDataService.js";

export default {
  data() {
    return {
      input: {
        subject: "",
        number: "",
      },
      response: {
        id: 0,
        title: "",
        hours: "",
        description: "",
      },
      is_new: true,
    };
  },
  computed: {
    is_valid_search() {
      return this.response.id;
    },
    is_invalid_search() {
      return !this.is_new && !this.is_valid_search;
    },
  },
  methods: {
    retrieveCourse() {
      if (this.is_new) {
        this.is_new = false;
      }
      CourseDataService.getByListing(this.input.subject, +this.input.number)
        .then((response) => {
          if (response) {
            const course = response.data;
            if (course) {
              this.response.id = course.id;
              this.response.title = course.title;
              this.response.hours = course.hours;
              this.response.description = course.descr;
            } else {
              this.response.id = 0;
            }
          } else {
            this.response.id = 0;
          }
        })
        .catch((_e) => {
          this.response.id = 0;
        });
    },
  },
};
</script>

<template>
  <div id="course-search" class="flex justify-content-center flex-wrap card-container mt-5">
    <div style="max-width: 575px" class="grid p-fluid">
      <div class="col-4 p-2">
        <span class="p-float-label">
          <PrimeInputMask
            id="subject"
            class="max-w-12rem"
            v-model="input.subject"
            mask="aaa?a"
            slotChar=""
            style="text-transform: uppercase"
          />
          <label for="subject">Course Subject</label>
        </span>
      </div>

      <div class="col-4 p-2">
        <span class="p-float-label">
          <PrimeInputMask id="number" class="max-w-12rem" v-model="input.number" mask="999" slotChar="" />
          <label for="number">Course Number</label>
        </span>
      </div>

      <div class="col-4 p-2">
        <PrimeButton
          @click="retrieveCourse"
          label="Search"
          icon="pi pi-search"
          iconPos="right"
          class="p-button-secondary"
        />
      </div>

      <PrimeCard class="m-2 flex-grow-1" v-if="is_valid_search">
        <template #title>
          {{ response.title }}
        </template>

        <template #subtitle> Credit Hours: {{ response.hours }} </template>

        <template #content>
          {{ response.description }}
        </template>
      </PrimeCard>
      <PrimeCard class="m-2 flex-grow-1" v-if="is_invalid_search">
        <template #content>
          <em> That course could not be located. Please try a different course. </em>
        </template>
      </PrimeCard>
      <PrimeCard class="m-2 flex-grow-1" v-if="is_new">
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
    </div>
  </div>
</template>
