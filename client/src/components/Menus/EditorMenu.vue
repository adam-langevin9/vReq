<script setup lang="ts">
import ManualNodeChips from "@/components/ManualNodeChips/ManualNodeChips.vue";
import { useConfirmToast } from "@/stores/ConfirmToast.store";
import { useCourseFlow } from "@/stores/CourseFlow.store";
import { useEditor } from "@/stores/Editor.store";
import { computed, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { validListing } from "@/services/ListingDataService";

// stores
const editor = useEditor();
const confirmToast = useConfirmToast();
const courseFlow = useCourseFlow();

//setup
if (!editor.degrees) editor.fillDegrees();

// state
const courseInput = ref({ subj: "", num: "" });
const courseSubmitted = ref(false);
const degreeInput = ref({ id: 0, title: "" });
const degreeSubmitted = ref(false);

// validation
const courseInputRules = computed(() => ({
  subj: {
    required,
    exists: helpers.withMessage(
      "Invalid Course",
      helpers.withAsync(async (subj: string) => await validListing(subj, courseInput.value.num), courseInput)
    ),
  },
  num: {
    required,
  },
}));
const courseInputV$ = useVuelidate(courseInputRules, courseInput);
const degreeInputRules = computed(() => ({
  id: {
    required,
    notZero: helpers.withMessage("Please select a degree", (id: number) => id !== 0),
  },
  title: {
    required,
  },
}));
const degreeInputV$ = useVuelidate(degreeInputRules, degreeInput);

// submit handlers
function submitCourse(action: (subj: string, num: number) => void) {
  courseSubmitted.value = true;
  if (courseInputV$.value.$invalid) return;
  action(courseInput.value.subj, +courseInput.value.num);
  courseSubmitted.value = false;
}
function submitDegree(action: (degree: { id: number; title: string }) => void) {
  degreeSubmitted.value = true;
  if (degreeInputV$.value.$invalid) return;
  action(degreeInput.value);
  degreeSubmitted.value = false;
}

// toast actions
function showConfirmRemoveAll() {
  confirmToast.open(
    "error",
    `Are you sure you want to remove all courses?`,
    "This action can not be undone",
    editor.clear
  );
}
</script>
<template>
  <PrimeDivider class="m-0" />
  <div class="m-0">
    <div>
      <h3 class="m-0 text-center">Add Course</h3>
    </div>
    <p class="m-1 text-center text-xs">Adding a course will add the course and its requirements to the visual.</p>
  </div>
  <div class="p-inputgroup">
    <div>
      <div>
        <span class="p-float-label">
          <PrimeInputMask
            :class="{ 'w-full keep-style': true, 'p-invalid': courseInputV$.subj.$invalid && courseSubmitted }"
            id="subject"
            v-model="courseInputV$.subj.$model"
            mask="aaa?a"
            slotChar=""
            style="text-transform: uppercase"
          />
          <label for="subject" :class="{ 'p-invalid': courseInputV$.subj.$invalid && courseSubmitted }"
            >Course Subject</label
          >
        </span>
      </div>
      <small v-if="courseInputV$.subj.required.$invalid && courseSubmitted" class="p-error">{{
        courseInputV$.subj.required.$message
      }}</small>
      <small v-if="courseInputV$.subj.exists.$invalid && courseSubmitted" class="p-error">{{
        courseInputV$.subj.exists.$message
      }}</small>
    </div>

    <div>
      <div>
        <span class="p-float-label">
          <PrimeInputMask
            :class="{
              'w-full keep-style': true,
              'p-invalid': (courseInputV$.num.$invalid || courseInputV$.subj.exists.$invalid) && courseSubmitted,
            }"
            id="number"
            v-model="courseInputV$.num.$model"
            mask="999"
            slotChar=""
          />
          <label for="number">Course Number</label>
        </span>
      </div>
      <small v-if="courseInputV$.num.$invalid && courseSubmitted" class="p-error">{{
        courseInputV$.num.required.$message
      }}</small>
    </div>

    <div>
      <div>
        <PrimeButton
          @click="() => submitCourse(editor.retrieveCourse)"
          icon="pi pi-info-circle"
          class="p-button-secondary"
        />
      </div>
    </div>
  </div>

  <PrimeCard v-if="editor.searchResult">
    <template #title> </template>
    <template #subtitle> {{ editor.searchResult.title }}</template>
    <template #content>
      {{ editor.searchResult.descr }}
    </template>
    <template #footer>
      <span v-if="editor.searchResult.hours">Credit Hours:</span>
      {{ editor.searchResult.hours }}
    </template>
  </PrimeCard>

  <div class="flex justify-content-center">
    <PrimeButton label="Add Course" @click="submitCourse(editor.addCourseToFlow)" class="p-button-outlined" />
  </div>

  <PrimeDivider />
  <div class="m-0">
    <div>
      <h3 class="m-0 text-center">Add Degree</h3>
    </div>
    <p class="m-1 text-center text-xs">
      Adding a degree will add the degree's required courses along with their requirements.
    </p>
  </div>
  <div>
    <PrimeDropdown
      v-model="degreeInput"
      :options="editor.degrees"
      optionLabel="title"
      placeholder="Select a Degree"
      :class="{
        'keep-style flex align-content-center justify-items-center': true,
        'p-invalid': degreeInputV$.$invalid && degreeSubmitted,
      }"
    />
    <small v-if="degreeInputV$.$invalid && degreeSubmitted" class="p-error">{{
      degreeInputV$.id.notZero.$message
    }}</small>
  </div>
  <div class="flex justify-content-center">
    <PrimeButton label="Add Degree" @click="submitDegree(editor.addDegreeToFlow)" class="p-button-outlined" />
  </div>

  <PrimeDivider />

  <div class="m-0">
    <div>
      <h3 class="m-0 text-center">Remove Course(s)</h3>
    </div>
    <p class="m-0 mt-1 text-center text-xs">
      When you remove a course that you added, all of it requirements will be removed as well.
    </p>
  </div>

  <ManualNodeChips class="flex" />

  <div class="flex justify-content-center" v-if="courseFlow.getManualNodes.length > 0">
    <PrimeButton
      label="Remove All"
      @click="showConfirmRemoveAll"
      class="p-button-danger p-button-rounded p-button-outlined"
    />
  </div>
</template>
<style scoped>
:deep(.p-card-content) {
  font-size: small;
}
:deep(.p-card-footer) {
  font-size: small;
}
</style>
