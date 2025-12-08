import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./path";

const HomePage = lazy(() => import("../pages/Home"));

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <HomePage />,
  },
]);
