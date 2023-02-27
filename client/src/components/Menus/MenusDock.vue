<script setup lang="ts">
import { ref } from "vue";
import MenuPanel from "./MenuPanel.vue";
import { useDock, MenuNames } from "@/stores/MenusDock.store";
import CourseSearch from "./EditorMenu.vue";
import { useAlternatives } from "@/stores/Alternatives.store";
import AltSelectorGroup from "./AltSelector/AltSelectorGroup.vue";
import UserMenu from "./UserMenu.vue";
import { useUser } from "@/stores/User.store";
import { useCourseFlow } from "@/stores/CourseFlow.store";
import PrinterMenu from "./PrinterMenu.vue";
import KeyMenu from "./KeyMenu.vue";
import SaveMenu from "./SaveMenu.vue";
import { useToast } from "primevue/usetoast";

// stores
const dock = useDock();
const alternatives = useAlternatives();
const user = useUser();
const courseFlow = useCourseFlow();
const toast = useToast();

// toast actions
function showLoginToSave() {
  toast.add({
    group: "loginToLoad",
    severity: "info",
    summary: "Login to Save Your Visual",
    closable: false,
  });
}

// state
const dockItems = ref([
  {
    menuName: MenuNames.USER,
    label: "User",
    icon: "pi pi-user",
    command: () => dock.toggle(MenuNames.USER),
  },
  {
    menuName: MenuNames.KEY,
    label: "Key",
    icon: "pi pi-key",
    command: () => dock.toggle(MenuNames.KEY),
  },
  {
    menuName: MenuNames.EDITOR,
    label: "Edit",
    icon: "pi pi-pencil",
    command: () => dock.toggle(MenuNames.EDITOR),
  },
  {
    menuName: MenuNames.ALTERNATIVES,
    label: "Alts",
    icon: "pi pi-share-alt",
    command: () => dock.toggle(MenuNames.ALTERNATIVES),
  },
  {
    menuName: MenuNames.SAVE,
    label: "Save",
    icon: "pi pi-save",
    command: () => {
      dock.toggle(MenuNames.SAVE);
      if (!user.id) showLoginToSave();
    },
  },
  {
    menuName: MenuNames.PRINT,
    label: "Print",
    icon: "pi pi-print",
    command: () => {
      dock.toggle(MenuNames.PRINT);
      setTimeout(courseFlow.fitView, 100);
    },
  },
]);
</script>

<template>
  <MenuPanel
    title="User"
    :subtitle="user.id?.toUpperCase()"
    buttonStyle="transform: rotate(180deg)"
    :buttonIcon="user.id ? 'pi pi-sign-out' : ''"
    :buttonAction="user.showConfirmLogout"
    v-model="dock.isUserSelected"
    ><UserMenu></UserMenu
  ></MenuPanel>
  <MenuPanel title="Key" v-model="dock.isKeySelected"><KeyMenu></KeyMenu></MenuPanel>
  <MenuPanel title="Editor" v-model="dock.isEditorSelected"><CourseSearch></CourseSearch></MenuPanel>
  <MenuPanel title="Alternatives" v-model="dock.isAlternativesSelected">
    <PrimeDivider class="m-0" />
    <p class="text-xs text-center m-0">
      Courses in your visual with alternative requirements will appear here. If they are currently hidden, they will be
      greyed out.
    </p>
    <PrimeAccordion v-model:active-index="alternatives.activeTabs" :multiple="true">
      <PrimeAccordionTab
        v-for="(header, index) in alternatives.altReqHeaders"
        :key="index"
        :header="alternatives.getSelectedName(alternatives.courseFlow.findNode(header.targetID)!)"
        :disabled="header.disabled"
      >
        <AltSelectorGroup :altReqs="alternatives.getAltReqsFor(header.targetID)" />
      </PrimeAccordionTab>
    </PrimeAccordion>
  </MenuPanel>
  <MenuPanel title="Save" v-model="dock.isSaveSelected"><SaveMenu></SaveMenu></MenuPanel>

  <MenuPanel title="Print" v-model="dock.isPrintSelected"><PrinterMenu></PrinterMenu></MenuPanel>
  <PrimeDock :model="dockItems" position="left">
    <template #item="{ item }">
      <a
        v-if="user.id"
        href="#"
        :class="{ 'p-dock-item': true, open: dock.menus[item.menuName] }"
        @click="item.command"
      >
        <div class="flex flex-column align-items-center max-w-3rem">
          <div>
            <i :class="item.icon"></i>
          </div>
          <div
            style="font-size: x-small"
            class="max-w-3rem white-space-nowrap overflow-hidden text-overflow-ellipsis px-1"
          >
            {{ item.label }}
          </div>
        </div>
      </a>
      <a
        v-else
        href="#"
        :class="{ 'p-dock-item': true, open: dock.menus[item.menuName] }"
        @click="item.command"
        @focus="() => toast.removeGroup('loginToLoad')"
      >
        <div class="flex flex-column align-items-center max-w-3rem">
          <div>
            <i :class="item.icon"></i>
          </div>
          <div
            style="font-size: x-small"
            class="max-w-3rem white-space-nowrap overflow-hidden text-overflow-ellipsis px-1"
          >
            {{ item.label }}
          </div>
        </div>
      </a>
    </template>
  </PrimeDock>
</template>

<style>
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
.p-dock {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 3rem;
  height: 100%;
  background-color: var(--secondary-color);
  color: #333;
  font-size: 1rem;
  text-decoration: none;
  box-shadow: 0px 10px 1px -7px rgb(0 0 0 / 20%), 0px 1px 5px 3px rgb(0 0 0 / 14%), 0px 1px 8px 3px rgb(0 0 0 / 14%);
  clip-path: inset(-10px -10px -10px 0px);
}
.p-dock-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 3rem;
  background-color: #f0f0f0;
  transition: left 0.3s;
  z-index: 1100;
}
.p-dock-container.condense {
  left: 30rem;
}

.p-dock-list-container {
  overflow-y: clip !important;
  border: none !important;
  background: none !important;
  height: 100%;
  padding-top: 0 !important;
}
.p-dock-list {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

.p-dock-item,
.p-dock-item:focus-visible {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: var(--secondary-color);
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 0 50% 50% 0 !important;
  text-overflow: ellipsis;
}
li.p-dock-item:first-child {
  position: absolute;
  top: 0.5rem;
  left: 0;
}
li.p-dock-item:nth-child(2) {
  position: absolute;
  top: 4rem;
  left: 0;
}
a.p-dock-item:hover:not(.open) {
  background-color: #6c8997;
}
a.p-dock-item.open {
  background-color: #fff;
  color: var(--secondary-color);
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  box-shadow: 0px 10px 1px -7px rgb(0 0 0 / 20%), 0px 1px 3px 3px rgb(0 0 0 / 14%);
}
.p-dock-item-second-prev,
.p-dock-item-prev,
.p-dock-item-current,
.p-dock-item-next,
.p-dock-item-second-next {
  transform: none !important;
  margin: inherit !important;
}
.pi.pi-sitemap {
  transform: rotate(90deg);
}
.pi.pi-share-alt {
  transform: rotate(180deg);
}
</style>
