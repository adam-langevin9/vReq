<script setup lang="ts">
import { usePrinter } from "@/stores/Printer.store";

const printer = usePrinter();
</script>
<template>
  <PrimeDivider class="m-0" />
  <div class="flex align-items-center justify-content-between gap-5">
    <div class="flex flex-column gap-1">
      <div>Print in Color</div>
      <div style="font-size: x-small">Include course background and border colors</div>
    </div>
    <PrimeInputSwitch v-model="printer.isColor" />
  </div>
  <div class="flex align-items-center justify-content-between gap-5">
    <div class="flex flex-column gap-1">
      <div>Include Course Descriptions</div>
      <div style="font-size: x-small">Course descriptions will be included on subsequent pages</div>
    </div>
    <PrimeInputSwitch v-model="printer.includeDescr" />
  </div>

  <PrimeButton label="Print" class="p-button-outlined" @click="printer.print" />
  <div class="flex flex-column gap-5"></div>
</template>
<style scoped></style>
