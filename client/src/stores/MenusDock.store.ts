import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";

export type MenuName = "user" | "editor" | "alternatives" | "print" | "save";

export enum MenuNames {
  USER = "user",
  EDITOR = "editor",
  ALTERNATIVES = "alternatives",
  PRINT = "print",
}

export const useDock = defineStore("Dock", () => {
  // states
  const menus: { [index: string]: Ref<boolean> } = {
    [MenuNames.USER]: ref(false),
    [MenuNames.EDITOR]: ref(false),
    [MenuNames.ALTERNATIVES]: ref(false),
    [MenuNames.PRINT]: ref(false),
  };

  // computed
  const isAnySelected = computed(
    () => menus.user.value || menus.editor.value || menus.alternatives.value || menus.print.value
  );
  const isUserSelected = computed({
    get() {
      return menus[MenuNames.USER].value;
    },
    set(value: boolean) {
      menus[MenuNames.USER].value = value;
      menus[MenuNames.EDITOR].value = false;
      menus[MenuNames.ALTERNATIVES].value = false;
      menus[MenuNames.PRINT].value = false;
    },
  });
  const isEditorSelected = computed({
    get() {
      return menus[MenuNames.EDITOR].value;
    },
    set(value: boolean) {
      menus[MenuNames.USER].value = false;
      menus[MenuNames.EDITOR].value = value;
      menus[MenuNames.ALTERNATIVES].value = false;
      menus[MenuNames.PRINT].value = false;
    },
  });
  const isAlternativesSelected = computed({
    get() {
      return menus[MenuNames.ALTERNATIVES].value;
    },
    set(value: boolean) {
      menus[MenuNames.USER].value = false;
      menus[MenuNames.EDITOR].value = false;
      menus[MenuNames.ALTERNATIVES].value = value;
      menus[MenuNames.PRINT].value = false;
    },
  });
  const isPrintSelected = computed({
    get() {
      return menus[MenuNames.PRINT].value;
    },
    set(value: boolean) {
      menus[MenuNames.USER].value = false;
      menus[MenuNames.EDITOR].value = false;
      menus[MenuNames.ALTERNATIVES].value = false;
      menus[MenuNames.PRINT].value = value;
    },
  });

  // actions
  function isSelected(menuName: MenuName) {
    return menus[menuName].value;
  }
  function toggle(menuName: MenuName) {
    for (const key in menus) {
      menus[key].value = key === menuName && !menus[key].value;
    }
  }
  function open(menuName: MenuName) {
    for (const key in menus) {
      menus[key].value = menus[key].value === menus[menuName].value;
    }
  }
  function close(menuName: MenuName) {
    menus[menuName].value = false;
  }

  return {
    menus,
    isAnySelected,
    isUserSelected,
    isEditorSelected,
    isAlternativesSelected,
    isPrintSelected,
    isSelected,
    toggle,
    open,
    close,
  };
});
