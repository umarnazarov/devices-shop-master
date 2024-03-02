import routes from "./routes";

export const initAuthModule = ({ router }) => {
  routes.map((route) => router.addRoute(route));
};
