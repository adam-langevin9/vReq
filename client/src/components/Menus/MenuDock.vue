<script setup lang="ts">
import { ref } from "vue";
import MenuPanel from "./MenuPanel.vue";
import { useMenuDock } from "@/stores/Menus/MenuDock.store";
import CourseSearch from "./EditorMenu.vue";
import { useAlternativesMenu } from "@/stores/Menus/AlternativesMenu.store";
import AltSelectorGroup from "./AltSelector/AltSelectorGroup.vue";
import UserMenu from "./UserMenu.vue";
import { useUser } from "@/stores/User.store";
import FileMenu from "./FileMenu.vue";

const menuDock = useMenuDock();
const altMenu = useAlternativesMenu();
const user = useUser();
const dockItems = ref([
  {
    label: "User",
    icon: "pi pi-user",
    command: () => {
      menuDock.toggleUser();
    },
  },
  {
    label: "Directions",
    icon: "pi pi-map",
    command: () => {
      menuDock.toggleDirections();
    },
  },
  {
    label: "Editor",
    icon: "pi pi-pencil",
    command: () => {
      menuDock.toggleAddCourses();
    },
  },
  {
    label: "Alternatives",
    icon: "pi pi-sitemap",
    command: () => {
      menuDock.toggleAlternative();
    },
  },
  {
    label: "File",
    icon: "pi pi-folder",
    command: () => {
      menuDock.toggleFile();
    },
    disabled: () => !user.id,
  },
]);
</script>

<template>
  <MenuPanel title="User" v-model="menuDock.displayUser"><UserMenu></UserMenu></MenuPanel>
  <MenuPanel title="Directions" v-model="menuDock.displayDirections" />
  <MenuPanel title="Editor" v-model="menuDock.displayAddCourses"><CourseSearch></CourseSearch></MenuPanel>
  <MenuPanel title="Alternatives" v-model="menuDock.displayAlternative">
    <PrimeAccordion v-model:active-index="altMenu.activeTabs" :multiple="true">
      <PrimeAccordionTab
        v-for="(header, index) in altMenu.altReqHeaders"
        :key="index"
        :header="altMenu.getSelectedName(altMenu.courseFlow.findNode(header.targetID)!)"
        :disabled="header.disabled"
      >
        <AltSelectorGroup :altReqs="altMenu.getAltReqsFor(header.targetID)" />
      </PrimeAccordionTab>
    </PrimeAccordion>
  </MenuPanel>
  <MenuPanel title="File" v-model="menuDock.displayFile"><FileMenu></FileMenu></MenuPanel>
  <PrimeDock :model="dockItems" position="left">
    <template #item="{ item }">
      <a href="#" class="p-dock-item" @click="item.command">
        <i :class="item.icon"></i>
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
