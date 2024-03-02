import { reactive } from "vue";
import { defineStore } from "pinia";
import { computed } from "@vue/reactivity";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const state = reactive({
      user: null,
    });

    const isAuthenticated = computed(() => state.user !== null);

    return {
      state,
      isAuthenticated,
    };
  },
  {
    persist: true,
  }
);
