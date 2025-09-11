import { Outlet } from "react-router";
import { AuthContextProvider } from "./components/AuthContext";
import { Nav } from "./components/Nav";
import "./App.css";

export function App() {
  return (
    <AuthContextProvider>
      <div>
        <header>
          <span>Blog</span>
          <Nav />
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </AuthContextProvider>
  );
}
