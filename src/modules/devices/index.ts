import routes from "./routes";

export const initDevicesModule = ({ router }) => {
  routes.map((route) => router.addRoute(route));
};
