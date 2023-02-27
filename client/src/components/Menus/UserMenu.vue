<script setup lang="ts">
import { useUser } from "@/stores/User.store";
import { computed, ref } from "vue";
import { isAvailable, exists, verifyUser } from "@/services/UserDataService";
import { createUser } from "@/services/UserDataService";
import { readTitles } from "@/services/VisualDataService";
import { useToast } from "primevue/usetoast";

// stores
const user = useUser();
const toast = useToast();

// state
const loginInput = ref({ un: "", pw: "", valid: false, submitted: false });
const createInput = ref({ un: "", pw: "", pwConfirm: "", valid: false, submitted: false });

// validation
const isInvalidLogin = computed(() => loginInput.value.submitted && !loginInput.value.valid);
const isInvalidCreate = computed(() => createInput.value.submitted && !createInput.value.valid);
async function setLoginValid() {
  return !!loginInput.value.un && !!loginInput.value.pw && (await verifyUser(loginInput.value.un, loginInput.value.pw));
}
async function setCreateValid() {
  return (
    !!createInput.value.un &&
    !!createInput.value.pw &&
    !!createInput.value.pwConfirm &&
    createInput.value.pw === createInput.value.pwConfirm &&
    (await isAvailable(createInput.value.un))
  );
}

// submit handlers
async function submitLogin() {
  loginInput.value.valid = !!(await setLoginValid());
  loginInput.value.submitted = true;

  if (!loginInput.value.valid) return;
  const response = await readTitles(loginInput.value.un);
  if (response) {
    toast.removeGroup("loginToLoad");
    user.id = loginInput.value.un;
    user.titles = response;
    loginInput.value.submitted = false;
    loginInput.value.valid = false;
  }
}

async function submitCreate() {
  createInput.value.valid = !!(await setCreateValid());
  createInput.value.submitted = true;

  if (!createInput.value.valid) return;
  const response = await createUser(createInput.value.un, createInput.value.pw);
  if (response) {
    toast.removeGroup("loginToLoad");
    (user.id = response.id), (user.titles = response.visuals);
    createInput.value.submitted = false;
    createInput.value.valid = false;
  }
}
</script>
<template>
  <PrimeDivider class="m-0" />
  <div v-if="user.id">
    <div class="flex justify-content-center">
      <PrimeButton label="Logout" @click="user.showConfirmLogout" class="p-button-outlined p-button-danger" />
    </div>
  </div>
  <div v-else class="flex flex-column gap-5">
    <form class="flex flex-column gap-5">
      <h3 class="flex justify-content-center m-0">Login</h3>
      <div>
        <div class="flex justify-content-center flex-grow-1">
          <span class="p-float-label">
            <PrimeInputMask
              :class="{ 'w-full keep-style': true, 'p-invalid': isInvalidLogin }"
              id="uname"
              v-model="loginInput.un"
              mask="*?************************"
              slotChar=""
              autocomplete="username"
            />
            <label for="uname">Username</label>
          </span>
        </div>
      </div>
      <div>
        <div class="flex justify-content-center flex-grow-1">
          <span class="p-float-label">
            <PrimePassword
              id="pw"
              :class="{
                'w-full keep-style': true,
                'p-invalid': isInvalidLogin,
              }"
              v-model="loginInput.pw"
              :toggleMask="true"
              :feedback="false"
              autocomplete="current-password"
            />
            <label for="pw">Password</label>
          </span>
        </div>
        <small v-if="isInvalidLogin" class="p-error flex justify-content-center flex-grow-1">Invalid Login</small>
      </div>

      <div class="flex justify-content-center">
        <PrimeButton label="Login" @click="submitLogin" class="p-button-outlined p-button-secondary" />
      </div>
    </form>

    <PrimeDivider />

    <form class="flex flex-column gap-5">
      <h3 class="flex justify-content-center m-0">Create an Account</h3>
      <div>
        <div class="flex justify-content-center flex-grow-1">
          <span class="p-float-label">
            <PrimeInputMask
              :class="{
                'w-full keep-style': true,
                'p-invalid': isInvalidCreate,
              }"
              id="new-uname"
              v-model="createInput.un"
              mask="*?************************"
              slotChar=""
              autocomplete="username"
            />
            <label for="new-uname">Username</label>
          </span>
        </div>
      </div>
      <div class="flex justify-content-center flex-grow-1">
        <span class="p-float-label">
          <PrimePassword
            id="new-pwd"
            :class="{
              'w-full keep-style': true,
              'p-invalid': isInvalidCreate,
            }"
            v-model="createInput.pw"
            :toggleMask="true"
            :feedback="false"
            autocomplete="new-password"
          />
          <label for="new-pwd">Password</label>
        </span>
      </div>
      <div>
        <div class="flex justify-content-center flex-grow-1">
          <span class="p-float-label">
            <PrimePassword
              id="confirm-pwd"
              :class="{
                'w-full keep-style': true,
                'p-invalid': isInvalidCreate,
              }"
              v-model="createInput.pwConfirm"
              :toggleMask="true"
              :feedback="false"
              autocomplete="new-password"
            />
            <label for="confirm-pwd">Confirm Password</label>
          </span>
        </div>
        <small v-if="isInvalidCreate" class="p-error flex justify-content-center flex-grow-1"
          >Invalid Entry, Check that you passwords match and try a new name.</small
        >
      </div>

      <div class="flex justify-content-center">
        <PrimeButton label="Create" @click="submitCreate" class="p-button-outlined" />
      </div>
    </form>
  </div>
</template>
<style scoped></style>
