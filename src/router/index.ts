import { createRouter, createWebHistory } from "vue-router";
import { requiresAuthenticationGuard } from "./guards/requires-authentication";
import { DevicesRouteName } from "@/modules/devices/routes";

export enum AppRouteName {
  DEVICES_ROUTE = "devices",
  NOT_FOUND_ROUTE = "not-found",
  NOT_AUTHORIZED_ROUTE = "not-authorized",
  SERVER_ERROR_ROUTE = "server-error",
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: DevicesRouteName.DEVICES },
    },
  ],
});

router.beforeEach(requiresAuthenticationGuard);

export default router;
