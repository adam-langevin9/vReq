<script setup lang="ts">
import { useUser } from "@/stores/User.store";
import { ref } from "vue";
const user = useUser();

const uname = ref("");
const pwd = ref("");
const newUname = ref("");
const newPwd = ref("");
const newPwdConfirm = ref("");

const submitLogin = () => {
  user.login(uname.value, pwd.value);
  uname.value = "";
  pwd.value = "";
};
const submitCreate = () => {
  if (newPwd.value !== newPwdConfirm.value) {
    newPwdConfirm.value = "";
    return;
  }
  user.create(newUname.value, newPwd.value);
  newUname.value = "";
  newPwd.value = "";
  newPwdConfirm.value = "";
};
const submitLogout = () => {
  user.id = undefined;
};
</script>
<template>
  <PrimeDivider class="m-0" />
  <div v-if="!user.id" class="flex flex-column gap-5">
    <form class="flex flex-column gap-5">
      <h3 class="flex justify-content-center m-0">Login</h3>
      <div class="flex justify-content-center flex-grow-1">
        <span class="p-float-label">
          <PrimeInputMask
            class="w-full keep-style"
            id="uname"
            v-model="uname"
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
            v-model="pwd"
            :toggleMask="true"
            :feedback="false"
            autocomplete="current-password"
          />
          <label for="pwd">Password</label>
        </span>
      </div>

      <div class="flex justify-content-center">
        <PrimeButton label="Login" @click="submitLogin" />
      </div>
    </form>

    <PrimeDivider />
    <form class="flex flex-column gap-5">
      <h3 class="flex justify-content-center m-0">Create an Account</h3>

      <div class="flex justify-content-center flex-grow-1">
        <span class="p-float-label">
          <PrimeInputMask
            class="w-full keep-style"
            id="new-uname"
            v-model="newUname"
            mask="*?************************"
            slotChar=""
            autocomplete="username"
          />
          <label for="new-uname">Username</label>
        </span>
      </div>

      <div class="flex justify-content-center flex-grow-1">
        <span class="p-float-label">
          <PrimePassword
            id="new-pwd"
            class="w-full keep-style"
            v-model="newPwd"
            :toggleMask="true"
            :feedback="false"
            autocomplete="new-password"
          />
          <label for="new-pwd">Password</label>
        </span>
      </div>

      <div class="flex justify-content-center flex-grow-1">
        <span class="p-float-label">
          <PrimePassword
            id="confirm-pwd"
            class="w-full keep-style"
            v-model="newPwdConfirm"
            :toggleMask="true"
            :feedback="false"
            autocomplete="new-password"
          />
          <label for="confirm-pwd">Confirm Password</label>
        </span>
      </div>

      <div class="flex justify-content-center">
        <PrimeButton label="Create" @click="submitCreate" />
      </div>
    </form>
  </div>
  <div v-else class="flex flex-column gap-5">
    <h3 class="flex justify-content-center m-0">Welcome, {{ user.id }}!</h3>
    <div class="flex justify-content-center">
      <PrimeButton label="Logout" @click="submitLogout" />
    </div>
  </div>
</template>
<style scoped></style>
