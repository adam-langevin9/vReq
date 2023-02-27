<script setup lang="ts"></script>
<template>
  <PrimeDivider class="m-0" />
  <div class="key">
    <h3 class="mt-0">Status</h3>
    <!-- Blocked Node -->
    <div class="item">
      <div class="node example" style="background-color: #fff">
        <div class="flex justify-content-between">
          <i class="pi pi-stop p-3"></i>
          <div class="single-listing">Blocked</div>
          <i class="pi pi-info-circle p-3"></i>
        </div>
      </div>
      <div class="descr">You have not completed all the requirements.</div>
    </div>
    <!-- Semi-Available Node -->
    <div class="item">
      <div class="node example" style="background-color: var(--danger-color-light); text-decoration: dotted underline">
        <div class="flex justify-content-between">
          <i class="pi pi-stop p-3"></i>
          <div class="single-listing">Semi-Available</div>
          <i class="pi pi-info-circle p-3"></i>
        </div>
      </div>
      <div class="descr">This course only has pre or corequisite requirements left.</div>
    </div>
    <!-- Available Node -->
    <div class="item">
      <div class="node example" style="background-color: var(--warning-color-light); text-decoration: underline">
        <div class="flex justify-content-between">
          <i class="pi pi-stop p-3"></i>
          <div class="single-listing">Available</div>
          <i class="pi pi-info-circle p-3"></i>
        </div>
      </div>
      <div class="descr">You have completed all the requirements for this course.</div>
    </div>
    <!-- Completed Node -->
    <div class="item">
      <div class="node example" style="background-color: var(--success-color-light)">
        <div class="flex justify-content-between">
          <i class="pi pi-check-square p-3"></i>
          <div class="single-listing">Completed</div>
          <i class="pi pi-info-circle p-3"></i>
        </div>
      </div>
      <div class="descr">You have completed this course.</div>
    </div>
    <h3 class="text-center">Requirements</h3>
    <!-- Prerequisite -->
    <div class="item">
      <div class="example">
        <div style="color: gray">Prerequisite</div>
        <img src="@/assets/solid-arrow.png" class="arrow" />
      </div>
      <div class="descr">
        Connects a course to its prerequisite, a course that must be taken prior the course in question.
      </div>
    </div>
    <!-- Pre or Corequisite -->
    <div class="item">
      <div class="example">
        <div style="color: gray">Pre or Corequisite</div>
        <img src="@/assets/dashed-arrow.png" class="arrow" />
      </div>
      <div class="descr">
        Connects a course to its pre or corequisite, a course that must be taken before or at the same time as the
        course in question.
      </div>
    </div>
    <!-- Corequisite Requirement Node -->
    <div class="item">
      <div class="outer node example" style="background-color: #fff">
        <div class="inner node example" style="background-color: #fff">
          <div class="flex justify-content-between">
            <i class="pi pi-stop p-3"></i>
            <div class="single-listing">Corequisite</div>
            <i class="pi pi-info-circle p-3"></i>
          </div>
        </div>
        <div class="inner node example" style="background-color: #fff">
          <div class="flex justify-content-between">
            <i class="pi pi-stop p-3"></i>
            <div class="single-listing">Corequisite</div>
            <i class="pi pi-info-circle p-3"></i>
          </div>
        </div>
      </div>
      <div class="descr">Two courses that must be taken at the same time.</div>
    </div>
    <!-- Degree Requirement Node -->
    <div class="item">
      <div class="node example" style="background-color: #fff; border-color: var(--info-color); font-weight: 700">
        <div class="flex justify-content-between">
          <i class="pi pi-stop p-3"></i>
          <div class="single-listing" style="">Degree Requirement</div>
          <i class="pi pi-info-circle p-3"></i>
        </div>
      </div>
      <div class="descr">A course that is required for your degree.</div>
    </div>
  </div>
</template>
<style scoped>
.key {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
  text-align: center;
  gap: 1rem;
}
.key .item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #fff;
  border-radius: 5rem;
}

.key .example {
  min-width: 13rem;
  pointer-events: none;
  user-select: none;
}
.key .descr {
  font-size: 0.65rem;
  flex-grow: 1;
}
.key .node {
  min-width: 13rem;
  pointer-events: none;
  user-select: none;
  border-width: 2px;
}
.key .single-listing {
  max-width: 7rem;
  overflow-wrap: break-word;
  white-space: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
}
.key .node.inner {
  min-width: 12.25rem;
  max-width: 12.25rem;
  height: auto;
}
.key .arrow {
  width: 12rem;
  pointer-events: none;
  user-select: none;
}
</style>
