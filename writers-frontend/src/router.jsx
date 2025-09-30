import { createBrowserRouter, redirect } from "react-router";
import { userInfo } from "./utils/userInfo.js";
import { App } from "./App.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { SignupPage } from "./pages/SignupPage.jsx";
import { ErrorPage } from "./pages/ErrorPage.jsx";

function indexLoader() {
  if (userInfo.exists()) return redirect("/home");
  return redirect("/entrar");
}

function authLoader() {
  if (userInfo.exists()) return redirect("/home");
  return null;
}

function appLoader() {
  if (!userInfo.exists()) return redirect("/entrar");
  return null;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      /* Index Route **********************************************************/
      {
        index: true,
        loader: indexLoader,
      },

      /* Auth Routes **********************************************************/
      {
        path: "entrar",
        loader: authLoader,
        Component: LoginPage,
      },
      {
        path: "criar-conta",
        loader: authLoader,
        Component: SignupPage,
      },

      /* App Route ************************************************************/
      {
        path: "home",
        loader: appLoader,
        element: <h1>HOME</h1>,
      },
      {
        path: "perfil",
        loader: appLoader,
        element: <h1>PERFIL</h1>,
      },

      /* Page not found *******************************************************/
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
]);
