import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
  },
});
