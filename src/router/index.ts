import { createRouter, createWebHistory } from "vue-router";
import { requiresAuthenticationGuard } from "./guards/requires-authentication";

export enum AppRouteName {
  HOME_ROUTE = "home",
  NOT_FOUND_ROUTE = "not-found",
  NOT_AUTHORIZED_ROUTE = "not-authorized",
  SERVER_ERROR_ROUTE = "server-error",
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
});

router.beforeEach(requiresAuthenticationGuard);

export default router;
