<script setup lang="ts"></script>
<template>
  <PrimeDivider class="m-0" />
  <div class="flex flex-column gap-5">
    <form class="flex flex-column gap-5">
      <h3 class="flex justify-content-center m-0">Login</h3>
      <div class="flex justify-content-center flex-grow-1">
        <span class="p-float-label">
          <PrimeInputMask
            class="w-full keep-style"
            id="uname"
            mask="*?************************"
            slotChar=""
            autocomplete="username"
          />
          <label for="uname">Username</label>
        </span>
      </div>

      <div class="flex justify-content-center flex-grow-1">
        <span class="p-float-label">
          <PrimePassword
            id="pwd"
            class="w-full keep-style"
            :toggleMask="true"
            :feedback="false"
            autocomplete="current-password"
          />
          <label for="pwd">Password</label>
        </span>
      </div>

      <div class="flex justify-content-center">
        <PrimeButton label="Login" @click="" />
      </div>
    </form>
  </div>
</template>
<style scoped></style>
