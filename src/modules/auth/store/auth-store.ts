import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { IUser, IUserState } from "../types";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const state = reactive<IUserState>({
      user: null,
    });

    const isAuthenticated = computed(() => state.user !== null);

    const setUser = (user: IUser | null) => {
      state.user = user;
    };

    return {
      state,
      isAuthenticated,
      setUser,
    };
  },
  {
    persist: true,
  }
);
