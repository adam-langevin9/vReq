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

const dock = useDock();
const alternatives = useAlternatives();
const user = useUser();
const courseFlow = useCourseFlow();
const dockItems = ref([
  {
    menuName: MenuNames.USER,
    label: "User",
    icon: "pi pi-user",
    command: () => dock.toggle(MenuNames.USER),
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
    icon: "pi pi-sitemap",
    command: () => dock.toggle(MenuNames.ALTERNATIVES),
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
  <!-- Not actually an error, v-model works properly -->
  <MenuPanel
    title="User"
    :subtitle="user.id?.toUpperCase()"
    buttonStyle="transform: rotate(180deg)"
    :buttonIcon="user.id ? 'pi pi-sign-out' : ''"
    :buttonAction="user.logout"
    v-model="dock.isUserSelected"
    ><UserMenu></UserMenu
  ></MenuPanel>
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
  <MenuPanel title="Print" v-model="dock.isPrintSelected"><PrinterMenu></PrinterMenu></MenuPanel>
  <PrimeDock :model="dockItems" position="left">
    <template #item="{ item }">
      <a href="#" :class="dock.menus[item.menuName] ? 'p-dock-item open' : 'p-dock-item'" @click="item.command">
        <div class="flex flex-column align-items-center justify-content-center">
          <div>
            <i :class="item.icon"></i>
          </div>
          <div style="font-size: x-small">{{ item.label }}</div>
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
.p-dock .p-dock-list-container {
  overflow-y: initial !important;
  border: none !important;
  background: none !important;
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
.p-dock-item {
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
}
.p-dock-item:hover:not(.open) {
  background-color: #6c8997;
}
a.p-dock-item.open {
  background-color: #fff;
  color: var(--secondary-color);
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  box-shadow: 0px 10px 1px -7px rgb(0 0 0 / 20%), 0px 1px 3px 3px rgb(0 0 0 / 14%);
}
.p-dock-item-second-prev {
  transform: none !important;
  margin: inherit !important;
}
.p-dock-item-prev {
  transform: none !important;
  margin: inherit !important;
}
.p-dock-item-current {
  transform: none !important;
  margin: inherit !important;
}
.p-dock-item-next {
  transform: none !important;
  margin: inherit !important;
}
.p-dock-item-second-next {
  transform: none !important;
  margin: inherit !important;
}
</style>
