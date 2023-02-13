import { createApp } from "vue";
import { createPinia } from "pinia";

// Plugins
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import DialogService from "primevue/dialogservice";

// Assets
import "primevue/resources/themes/lara-light-teal/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
/* these are necessary styles for vue flow */
import "@vue-flow/core/dist/style.css";
/* this contains the default theme, these are optional styles */
import "@vue-flow/core/dist/theme-default.css";
import "@vue-flow/controls/dist/style.css";
import "@vue-flow/minimap/dist/style.css";

// Components
import InputMask from "primevue/inputmask";
import Button from "primevue/button";
import Card from "primevue/card";
import Dropdown from "primevue/dropdown";
import Menu from "primevue/menu";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import RadioButton from "primevue/radiobutton";
import Divider from "primevue/divider";
import Sidebar from "primevue/sidebar";
import SplitButton from "primevue/splitbutton";
import Chip from "primevue/chip";
import ProgressSpinner from "primevue/progressspinner";
import DynamicDialog from "primevue/dynamicdialog";
import Skeleton from "primevue/skeleton";

const app = createApp(App);

app.use(createPinia()).use(router).use(PrimeVue).use(DialogService);
app
  .component("PrimeButton", Button)
  .component("PrimeInputMask", InputMask)
  .component("PrimeCard", Card)
  .component("PrimeDropdown", Dropdown)
  .component("PrimeMenu", Menu)
  .component("PrimeAccordion", Accordion)
  .component("PrimeAccordionTab", AccordionTab)
  .component("PrimeRadioButton", RadioButton)
  .component("PrimeDivider", Divider)
  .component("PrimeSidebar", Sidebar)
  .component("PrimeSplitButton", SplitButton)
  .component("PrimeChip", Chip)
  .component("PrimeSpinner", ProgressSpinner)
  .component("PrimeDynamicDialog", DynamicDialog)
  .component("PrimeSkeleton", Skeleton);

app.mount("#app");
