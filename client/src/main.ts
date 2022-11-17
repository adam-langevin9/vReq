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

// Components
import InputText from "primevue/inputtext";

const app = createApp(App);

app.use(createPinia()).use(router).use(PrimeVue);
app.component("InputText", InputText);
app.mount("#app");
