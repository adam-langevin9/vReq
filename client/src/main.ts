import { createApp } from "vue";
import { createPinia } from "pinia";

// Plugins
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

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

const app = createApp(App);

app.use(createPinia()).use(router).use(PrimeVue);
app
  .component("PrimeButton", Button)
  .component("PrimeInputMask", InputMask)
  .component("PrimeCard", Card)
  .component("PrimeDropdown", Dropdown)
  .component("PrimeMenu", Menu);
app.mount("#app");
