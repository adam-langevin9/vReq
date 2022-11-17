<script lang="ts">
export default {
  data() {
    return {
      subject: "",
      number: "",
    };
  },
};
</script>

<template>
  <div>
    <h5>Course Input</h5>
    <div class="grid p-fluid">
      <div class="col-12 md:col-4">
        <div class="p-inputgroup">
          <span class="p-float-label">
            <InputText id="subject" type="text" v-model="subject" />
            <label for="subject">Course Subject</label>
          </span>
        </div>
      </div>

      <div class="col-12 md:col-4">
        <div class="p-inputgroup">
          <span class="p-float-label">
            <InputText id="number" type="text" v-model="number" />
            <label for="number">Course Number</label>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scope></style>
