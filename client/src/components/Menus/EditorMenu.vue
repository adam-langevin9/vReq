<script setup lang="ts">
import ManualNodeChips from "@/components/ManualNodeChips/ManualNodeChips.vue";
import { useConfirmToast } from "@/stores/ConfirmToast.store";
import { useCourseFlow } from "@/stores/CourseFlow.store";
import { useEditor } from "@/stores/Editor.store";
import { computed, ref } from "vue";
import { validListing } from "@/services/ListingDataService";

// stores
const editor = useEditor();
const confirmToast = useConfirmToast();
const courseFlow = useCourseFlow();

//setup
if (!editor.degrees) editor.fillDegrees();

// state
const courseInput = ref({ subj: "", num: "", valid: false, submitted: false });
const degreeInput = ref({ id: 0, title: "", valid: false, submitted: false });

// validation
const isInvalidCourse = computed(() => courseInput.value.submitted && !courseInput.value.valid);
async function setCourseValid() {
  return (
    !!courseInput.value.subj &&
    !!courseInput.value.num &&
    !!(await validListing(courseInput.value.subj, courseInput.value.num))
  );
}
const isInvalidDegree = computed(() => degreeInput.value.submitted && !degreeInput.value.valid);
function setDegreeValid() {
  return !!degreeInput.value.id && !!degreeInput.value.title;
}

// submit handlers
async function submitCourse(action: (subj: string, num: number) => Promise<void>) {
  courseInput.value.valid = await setCourseValid();
  courseInput.value.submitted = true;
  if (!courseInput.value.valid) return;
  await action(courseInput.value.subj, +courseInput.value.num);
  // courseInput.value.subj = "";
  // courseInput.value.num = "";
  courseInput.value.submitted = false;
  courseInput.value.valid = false;
}
async function submitDegree(action: (id: number, title: string) => Promise<void>) {
  degreeInput.value.valid = setDegreeValid();
  degreeInput.value.submitted = true;
  if (!degreeInput.value.valid) return;
  await action(degreeInput.value.id, degreeInput.value.title);
  //degreeInput.value.id = 0;
  //degreeInput.value.title = "";
  degreeInput.value.submitted = false;
  degreeInput.value.valid = false;
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
            :class="{ 'w-full keep-style': true, 'p-invalid': isInvalidCourse }"
            id="subject"
            v-model="courseInput.subj"
            mask="aaa?a"
            slotChar=""
            style="text-transform: uppercase"
          />
          <label for="subject" :class="{ 'p-invalid': isInvalidCourse }">Course Subject</label>
        </span>
      </div>
      <small v-if="isInvalidCourse" class="p-error">Invalid Course</small>
    </div>

    <div>
      <div>
        <span class="p-float-label">
          <PrimeInputMask
            :class="{
              'w-full keep-style': true,
              'p-invalid': isInvalidCourse,
            }"
            id="number"
            v-model="courseInput.num"
            mask="999"
            slotChar=""
          />
          <label for="number">Course Number</label>
        </span>
      </div>
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
        'p-invalid': isInvalidDegree,
      }"
    />
    <small v-if="isInvalidDegree" class="p-error">Pick a Degree</small>
  </div>
  <div class="flex justify-content-center">
    <PrimeButton label="Add Degree" @click="submitDegree(editor.addDegreeToFlow)" class="p-button-outlined" />
  </div>

  <PrimeDivider />

  <div class="m-0">
    <div>
      <h3 class="m-0 text-center">Remove</h3>
    </div>
    <p class="m-0 mt-1 text-center text-xs">
      When you remove a course/degree that you added, all of it requirements will be removed as well.
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
