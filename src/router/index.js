import { createRouter, createWebHashHistory } from "vue-router";
import DashboardIndex from "../views/DashboardIndex.vue";
import ComponentTest from "../views/ComponentTest.vue";
import setPageTitle from "../shared/utils/page";

const routes = [
  {
    path: "/",
    name: "dashboard-index",
    component: DashboardIndex,
    meta: {
      title: "Dashboard",
    },
  },
  {
    path: "/test",
    component: ComponentTest,
    meta: {
      title: "Dashboard",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  setPageTitle(to.meta.title);
});

export default router;
