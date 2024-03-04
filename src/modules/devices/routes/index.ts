import type { RouteRecordRaw } from "vue-router";
import { LayoutName } from "@/common/layouts/types";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { AuthRouteName } from "@/modules/auth/routes";

export enum DevicesRouteName {
  DEVICES = "devices",
}

const routes: RouteRecordRaw[] = [
  {
    path: "/devices",
    name: DevicesRouteName.DEVICES,
    meta: {
      layout: LayoutName.DEFAULT_LAYOUT,
    },
    component: () => import("../views/devices.vue"),
    beforeEnter() {
      const { isAuthenticated } = useAuth();
      return isAuthenticated() ? true : { name: AuthRouteName.SIGN_IN };
    },
  },
];

export default routes;
