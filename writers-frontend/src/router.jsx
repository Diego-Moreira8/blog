import { createBrowserRouter, redirect } from "react-router";
import { authToken } from "./utils/authToken.js";
import { App } from "./App.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { SignupPage } from "./pages/SignupPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        loader: () => {
          if (authToken.exists()) return redirect("/home");
          return redirect("/entrar");
        },
      },
      {
        path: "entrar",
        loader: () => {
          if (authToken.exists()) return redirect("/home");
        },
        Component: LoginPage,
      },
      {
        path: "criar-conta",
        loader: () => {
          if (authToken.exists()) return redirect("/home");
        },
        Component: SignupPage,
      },
      {
        path: "home",
        element: <h1>HOME</h1>,
      },
    ],
  },
]);
