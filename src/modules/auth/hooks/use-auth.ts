import { useAuthStore } from "@/modules/auth/store/auth-store";
import { baseFetch } from "@/common/helpers/apiBase";
import { IUser } from "../types";

export function useAuth() {
  const store = useAuthStore();

  function isAuthenticated() {
    return store.isAuthenticated;
  }

  async function login(username: string, password: string) {
    try {
      const data = await baseFetch<IUser>("/user");

      if (data.username === username && data.password === password)
        store.setUser(data);
      else throw new Error("Invalid Credentials");
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  function logOut() {
    store.setUser(null);
  }

  return {
    isAuthenticated,
    login,
    logOut,
  };
}
