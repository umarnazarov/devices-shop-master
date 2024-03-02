import type { RouteRecordRaw } from "vue-router";
import { LayoutName } from "@/common/layouts/types";

export enum AuthRouteName {
  HOME = "home",
}

const routes: RouteRecordRaw[] = [
  {
    path: "/home",
    name: AuthRouteName.HOME,
    meta: {
      layout: LayoutName.NO_LAYOUT,
    },
    component: () => import("../views/home.vue"),
  },
];

export default routes;
