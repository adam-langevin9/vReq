import { createApp } from "vue";
import { createPinia } from "pinia";

// Plugins
import App from "./App.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

// Assets
//import "primevue/resources/themes/lara-light-teal/theme.css";
import "primevue/resources/themes/saga-green/theme.css";
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
import ProgressSpinner from "primevue/progressspinner";
import Skeleton from "primevue/skeleton";
import Toast from "primevue/toast";
import Dock from "primevue/dock";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import BlockUI from "primevue/blockui";
import InputSwitch from "primevue/inputswitch";
import Badge from "primevue/badge";
import Tooltip from "primevue/tooltip";

const app = createApp(App);

app.use(createPinia()).use(PrimeVue).use(ToastService);
app.directive("tooltip", Tooltip);
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
  .component("PrimeSpinner", ProgressSpinner)
  .component("PrimeSkeleton", Skeleton)
  .component("PrimeToast", Toast)
  .component("PrimeDock", Dock)
  .component("PrimePassword", Password)
  .component("PrimeInputText", InputText)
  .component("PrimeBlockUI", BlockUI)
  .component("PrimeInputSwitch", InputSwitch)
  .component("PrimeBadge", Badge);

app.mount("#app");
