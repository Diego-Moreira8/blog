import { createBrowserRouter, redirect } from "react-router";
import { authToken } from "./utils/authToken.js";
import { App } from "./App.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        loader: () => {
          if (authToken.exists()) return redirect("/home");
        },
      },
      {
        path: "login",
        loader: () => {
          if (authToken.exists()) return redirect("/home");
        },
        Component: LoginPage,
      },
      {
        path: "home",
        element: <h1>HOME</h1>,
      },
    ],
  },
]);
