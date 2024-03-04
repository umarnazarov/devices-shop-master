import { initDevicesModule } from "@/modules/devices";
import { initAuthModule } from "./auth";

export default (opts: any) => {
  initDevicesModule(opts);
  initAuthModule(opts);
};
