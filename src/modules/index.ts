import { initHomeModule } from "@/modules/home";
import { initAuthModule } from "./auth";

export default (opts: any) => {
  initHomeModule(opts);
  initAuthModule(opts);
};
