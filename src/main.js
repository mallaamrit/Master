import { createApp } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import App from "./App.vue";
import router from "./router";
import BaseComponents from "./shared/components";

import "@vuepic/vue-datepicker/dist/main.css";

const app = createApp(App);

app.use(BaseComponents);
app.component("DatePicker", Datepicker);

app.use(router).mount("#app");
