<script lang="ts">
export default {
  data() {
    return {
      search: {
        subject: "",
        number: "",
      },
      search_results: {
        subject: "",
        number: "",
        title: "",
        description: "Search a course to see its description",
      },
    };
  },
};
</script>

<template>
  <div
    id="course-search"
    class="flex justify-content-center flex-wrap card-container"
  >
    <div style="max-width: 575px" class="grid p-fluid">
      <div class="col-4 p-2">
        <span class="p-float-label">
          <InputMask
            id="subject"
            class="max-w-12rem"
            v-model="search.subject"
            mask="aaa?a"
            slotChar=""
            style="text-transform: uppercase"
          />
          <label for="subject">Course Subject</label>
        </span>
      </div>

      <div class="col-4 p-2">
        <span class="p-float-label">
          <InputMask
            id="number"
            class="max-w-12rem"
            v-model="search.number"
            mask="999"
            slotChar=""
          />
          <label for="number">Course Number</label>
        </span>
      </div>

      <div class="col-4 p-2">
        <Button
          label="Search"
          icon="pi pi-search"
          iconPos="right"
          class="p-button-secondary"
        />
      </div>

      <Card class="m-2 flex-grow-1">
        <template #title>
          {{ search_results.subject }} {{ search_results.number }}</template
        >

        <template #subtitle> {{ search_results.title }} </template>

        <template #content>
          {{ search_results.description }}
        </template>
      </Card>
      <Button label="Add Course(s)" icon="pi" iconPos="right" class="m-2" />
    </div>
  </div>
</template>

<style scoped></style>
