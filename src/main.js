import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import BaseComponents from "./shared/components";

const app = createApp(App);

app.use(BaseComponents);

app.use(router).mount("#app");
