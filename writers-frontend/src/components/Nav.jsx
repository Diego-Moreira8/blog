import { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "./AuthContext";

export function Nav() {
  const { isAuthenticated, removeAuthToken } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          {isAuthenticated ? (
            <button onClick={removeAuthToken}>Sair</button>
          ) : (
            <NavLink to="entrar">Entrar</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
