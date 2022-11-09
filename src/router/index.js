import { createRouter, createWebHashHistory } from "vue-router";
import OMGConenctRoutes from '@/modules/omgConnect/route'
import setPageTitle from "../shared/utils/page";


const routes = [
  ...OMGConenctRoutes
]


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  setPageTitle(to.meta.title);
});

export default router;
