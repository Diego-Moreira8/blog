import { createBrowserRouter, redirect } from "react-router";
import { userInfo } from "./utils/userInfo.js";
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
          if (userInfo.exists()) return redirect("/home");
          return redirect("/entrar");
        },
      },
      {
        path: "entrar",
        loader: () => {
          if (userInfo.exists()) return redirect("/home");
        },
        Component: LoginPage,
      },
      {
        path: "criar-conta",
        loader: () => {
          if (userInfo.exists()) return redirect("/home");
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
