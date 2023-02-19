import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";
import { createUser, loginUser } from "@/services/UserDataService";
import { useFileMenu } from "./Menus/FileMenu.store";

export const useUser = defineStore("User", () => {
  const id: Ref<string | undefined> = ref("aml");

  const login = async (username: string, password: string): Promise<void> => {
    const response = await loginUser(username, password);
    if (response !== undefined) {
      id.value = response.id;
      useFileMenu().visuals = response.visuals;
    }
  };
  const create = async (username: string, password: string): Promise<void> => {
    const wasCreated = await createUser(username, password);
    if (wasCreated) {
      id.value = username;
    }
  };

  return { id, login, create };
});
