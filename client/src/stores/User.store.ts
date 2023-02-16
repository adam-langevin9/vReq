import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";
import { createUser, loginUser } from "@/services/UserDataService";

export const useUser = defineStore("User", () => {
  const id: Ref<string | undefined> = ref("aml");
  const visuals = ref();

  const login = async (username: string, password: string): Promise<void> => {
    const someVisuals = await loginUser(username, password);
    if (someVisuals !== undefined) {
      id.value = username;
      visuals.value = visuals;
    }
  };
  const create = async (username: string, password: string): Promise<void> => {
    const wasCreated = await createUser(username, password);
    if (wasCreated) {
      id.value = username;
    }
  };

  return { id, visuals, login, create };
});
