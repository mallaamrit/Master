import { createApp } from "vue";
import Notifications from "@kyvg/vue3-notification";
import App from "./App.vue";
import router from "./router";
import BaseComponents from "./shared/components";
import "./shared/assets/styles/index.css";
import BaseIcons from "./shared/icons";

const app = createApp(App);

app.use(Notifications);
app.use(BaseComponents);
app.use(BaseIcons);

app.use(router).mount("#app");
