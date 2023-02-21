import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { createUser, loginUser } from "@/services/UserDataService";
import { useStorage, type RemovableRef } from "@vueuse/core";
import { useVisual } from "./Visual.store";
import { useEditor } from "./Editor.store";

export const useUser = defineStore("User", () => {
  // stores
  const visual = useVisual();
  const editor = useEditor();

  // state
  const id: RemovableRef<string | undefined> = useStorage("user-id", "");
  const startYear = ref(new Date().getFullYear());

  // actions
  async function login(username: string, password: string): Promise<void> {
    const user = await loginUser(username, password);
    if (user !== undefined) {
      id.value = user.id;
      visual.loadTitles(id.value);
    }
  }
  async function create(username: string, password: string): Promise<void> {
    const user = await createUser(username, password);
    if (user) id.value = username;
  }
  async function logout() {
    visual.id = "";
    editor.clear();
    id.value = undefined;
  }

  return { id, startYear, create, login, logout };
});
