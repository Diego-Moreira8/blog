import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import "./index.css";

import App from "./App.jsx";
import { Login } from "./pages/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        Component: App,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
