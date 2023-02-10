import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "../layouts/SideMenu/SideMenu.vue";
import SimpleMenu from "../layouts/SimpleMenu/SimpleMenu.vue";
import TopMenu from "../layouts/TopMenu/TopMenu.vue";
import Main from "../pages/Main.vue";

const routes = [
  {
    path: "/side-menu",
    component: SideMenu,
    children: [
      {
        path: "/main",
        name: "side-menu-main",
        component: Main,
      },
    ],
  },
  {
    path: "/simple-menu",
    component: SimpleMenu,
    children: [
      {
        path: "/main",
        name: "simple-menu-main",
        component: Main,
      },
    ],
  },
  {
    path: "/",
    component: TopMenu,
    children: [
      {
        path: "/",
        name: "top-menu-main",
        component: Main,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
