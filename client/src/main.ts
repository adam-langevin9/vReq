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

// Components
import InputMask from "primevue/inputmask";
import Button from "primevue/button";
import Card from "primevue/card";

const app = createApp(App);

app.use(createPinia()).use(router).use(PrimeVue);
app
  .component("Button", Button)
  .component("InputMask", InputMask)
  .component("Card", Card);
app.mount("#app");
