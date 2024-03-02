import type { RouteRecordRaw } from "vue-router";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { AppRouteName } from "@/router";
import { LayoutName } from "@/common/layouts/types";

export enum AuthRouteName {
  SIGN_IN = "sign-in",
}

const routes: RouteRecordRaw[] = [
  {
    path: "/sign-in",
    name: AuthRouteName.SIGN_IN,
    meta: {
      layout: LayoutName.NO_LAYOUT,
    },
    component: () => import("../views/sign-in.vue"),
    beforeEnter() {
      const { isAuthenticated } = useAuth();
      return isAuthenticated() ? { name: AppRouteName.HOME_ROUTE } : true;
    },
  },
];

export default routes;
