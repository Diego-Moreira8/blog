import { Outlet } from "react-router";
import { AuthContextProvider } from "./components/AuthContext";
import { Header } from "./components/Header";

export function App() {
  return (
    <AuthContextProvider>
      <div className="font-serif">
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </AuthContextProvider>
  );
}
