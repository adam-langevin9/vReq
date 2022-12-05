<script lang="ts">
import CourseDataService from "../services/CourseDataService.js";
import ListingDataService from "../services/ListingDataService";

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
      ListingDataService.getByListing(this.input.subject, +this.input.number)
        .then((response) => {
          const courseId = response.data.find((i) => i)?.course_id;
          if (courseId) {
            CourseDataService.getByID(courseId).then((response) => {
              const course = response.data;
              if (course) {
                if (this.is_new) {
                  this.is_new = false;
                }
                this.response.id = course.course_id;
                this.response.title = course.course_title;
                this.response.hours = course.course_hours;
                this.response.description = course.course_descr;
              } else {
                this.response.id = 0;
              }
            });
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
          <InputMask
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
          <InputMask id="number" class="max-w-12rem" v-model="input.number" mask="999" slotChar="" />
          <label for="number">Course Number</label>
        </span>
      </div>

      <div class="col-4 p-2">
        <Button @click="retrieveCourse" label="Search" icon="pi pi-search" iconPos="right" class="p-button-secondary" />
      </div>

      <Card class="m-2 flex-grow-1" v-if="is_valid_search">
        <template #title>
          {{ response.title }}
        </template>

        <template #subtitle> Credit Hours: {{ response.hours }} </template>

        <template #content>
          {{ response.description }}
        </template>
      </Card>
      <Card class="m-2 flex-grow-1" v-if="is_invalid_search">
        <template #content>
          <em> That course could not be located. Please try a different course. </em>
        </template>
      </Card>
      <Card class="m-2 flex-grow-1" v-if="is_new">
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
      </Card>
      <Button label="Add Course(s)" icon="pi" iconPos="right" class="m-2" />
    </div>
  </div>
</template>

<style scoped></style>
