import { useRoutes } from "react-router";
import { routes } from "@/app/router/routes";

export default function App() {
  return useRoutes(routes);
}
