<script setup lang="ts">
import { RouterView } from "vue-router";
import { useConfirmToast } from "./stores/ConfirmToast.store";
const confirmToast = useConfirmToast();
</script>

<template>
  <PrimeBlockUI :blocked="confirmToast.isOpen" style="z-index: 1100">
    <RouterView />
  </PrimeBlockUI>
</template>

<style>
:root {
  --primary-color: #4caf50;
  --secondary-color: #607d8b;
  --success-color: #689f38;
  --info-color: #0288d1;
  --warning-color: #fbc02d;
  --danger-color: #d32f2f;
  --primary-color-light: #a6d7a8;
  --secondary-color-light: #bfcbd1;
  --success-color-light: #b4cf9c;
  --info-color-light: #9acfed;
  --warning-color-light: #fde096;
  --danger-color-light: #f2c1c1;
}
</style>
