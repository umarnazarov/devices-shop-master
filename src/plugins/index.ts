import type { App } from "vue";
import initPinia from "./pinia";
import initElementPlus from "./element-plus";

export default (app: App<Element>) => {
  initPinia(app);
  initElementPlus(app);
};
