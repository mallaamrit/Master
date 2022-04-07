import { createRouter, createWebHashHistory } from "vue-router";
import DashboardIndex from "../views/DashboardIndex.vue";

const routes = [
  {
    path: "/",
    name: "dashboard-index",
    component: DashboardIndex,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
