import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("/@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("/@/views/login/index.vue"),
  },
  {
    name: "StsSystem",
    path: "/sts-system:pathMatch(.*)",
    component: () => import("/@/views/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
