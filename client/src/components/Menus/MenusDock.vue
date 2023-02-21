<script setup lang="ts">
import { ref } from "vue";
import MenuPanel from "./MenuPanel.vue";
import { useDock, MenuNames } from "@/stores/MenusDock.store";
import CourseSearch from "./EditorMenu.vue";
import { useAlternatives } from "@/stores/Alternatives.store";
import AltSelectorGroup from "./AltSelector/AltSelectorGroup.vue";
import UserMenu from "./UserMenu.vue";
import { useUser } from "@/stores/User.store";
import FileMenu from "./VisualMenu.vue";

const dock = useDock();
const alternatives = useAlternatives();
const user = useUser();
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
    command: () => dock.toggle(MenuNames.PRINT),
  },
]);
</script>

<template>
  <!-- Not actually an error, v-model works properly -->
  <MenuPanel
    title="User"
    :subtitle="user.id?.toUpperCase()"
    buttonStyle="transform: rotate(180deg)"
    buttonIcon="pi pi-sign-out"
    :buttonAction="user.logout"
    v-model="dock.isUserSelected"
    ><UserMenu></UserMenu
  ></MenuPanel>
  <MenuPanel title="Editor" v-model="dock.isEditorSelected"><CourseSearch></CourseSearch></MenuPanel>
  <MenuPanel title="Alternatives" v-model="dock.isAlternativesSelected">
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
  <MenuPanel title="Print" v-model="dock.isPrintSelected"><FileMenu></FileMenu></MenuPanel>
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
.p-dock {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: 3rem;
  height: 100%;
  background-color: #f5f5f5;
  color: #333;
  font-size: 1rem;
  text-decoration: none;
}
.p-dock-list-container {
  overflow-y: initial !important;
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
  background-color: #f5f5f5;
  color: #333;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 0 50% 50% 0 !important;
}
.p-dock-item:hover:not(.open) {
  background-color: #e8e8e8;
}
a.p-dock-item.open {
  background-color: #64748b;
  color: #fff;
  transition: background-color 0.8s ease-in-out, color 0.4s ease-in-out;
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
