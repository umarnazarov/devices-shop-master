import { useAuthStore } from "@/modules/auth/store/auth-store";

export function useAuth() {
  const store = useAuthStore();

  function isAuthenticated() {
    return store.isAuthenticated;
  }

  return {
    isAuthenticated,
  };
}
