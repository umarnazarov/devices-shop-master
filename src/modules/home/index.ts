import routes from "./routes";

export const initHomeModule = ({ router }) => {
  routes.map((route) => router.addRoute(route));
};
