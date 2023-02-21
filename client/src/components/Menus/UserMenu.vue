<script setup lang="ts">
import { useUser } from "@/stores/User.store";
import LoginMenu from "./LoginMenu.vue";
import SaveMenu from "./VisualMenu.vue";
const user = useUser();
</script>
<template>
  <PrimeDivider class="m-0" />
  <div v-if="!user.id" class="flex flex-column gap-5">
    <LoginMenu />
  </div>
  <div v-else class="flex flex-column gap-5">
    <SaveMenu />
  </div>
</template>
<style scoped></style>
