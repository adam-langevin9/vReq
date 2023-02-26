import { defineStore } from "pinia";
import { ref } from "vue";
import { createUser, loginUser } from "@/services/UserDataService";
import { useStorage, type RemovableRef } from "@vueuse/core";
import { useVisual } from "./Visual.store";
import { useEditor } from "./Editor.store";
import { useConfirmToast } from "./ConfirmToast.store";
import type { VisualTitleDTO } from "@/services/VisualDataService";

export const useUser = defineStore("User", () => {
  // stores
  const visual = useVisual();
  const editor = useEditor();
  const confirmToast = useConfirmToast();

  // state
  const id: RemovableRef<string | undefined> = useStorage("user-id", "");
  const titles: RemovableRef<VisualTitleDTO[]> = useStorage("user-titles", []);

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

  function _logout() {
    visual.id = 0;
    editor.clear();
    visual.titles = [];
    id.value = undefined;
  }

  const showConfirmLogout = () => {
    if (visual.isUpToDate) _logout();
    else confirmToast.open("warn", `Are you sure you want to logout?`, "You have unsaved changes", _logout);
  };

  return { id, titles, create, login, showConfirmLogout };
});
