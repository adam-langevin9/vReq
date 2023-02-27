import { defineStore } from "pinia";
import { createUser } from "@/services/UserDataService";
import { useStorage, type RemovableRef } from "@vueuse/core";
import { useVisual } from "./Visual.store";
import { useEditor } from "./Editor.store";
import { useConfirmToast } from "./ConfirmToast.store";
import type { VisualTitleDTO } from "@/services/VisualDataService";
import { useToast } from "primevue/usetoast";
import { watchEffect } from "vue";

export const useUser = defineStore("User", () => {
  // stores
  const visual = useVisual();
  const editor = useEditor();
  const confirmToast = useConfirmToast();
  const toast = useToast();

  // state
  const id: RemovableRef<string | undefined> = useStorage("user-id", "");
  const titles: RemovableRef<VisualTitleDTO[]> = useStorage("user-titles", []);

  // actions
  async function create(username: string, password: string): Promise<void> {
    const user = await createUser(username, password);
    if (user) {
      toast.removeGroup("loginToLoad");
      id.value = username;
    }
  }

  function _logout() {
    visual.id = 0;
    editor.clear(false);
    visual.titles = [];
    id.value = "";
  }

  const showConfirmLogout = () => {
    if (visual.isUpToDate) _logout();
    else confirmToast.open("warn", `Are you sure you want to logout?`, "You have unsaved changes", _logout);
  };

  //watchEffect(() => titles.value.sort((a, b) => a.title.localeCompare(b.title)));

  return { id, titles, create, showConfirmLogout };
});
