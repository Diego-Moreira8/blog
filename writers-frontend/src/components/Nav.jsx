import { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "./AuthContext";

export function Nav() {
  const { userData, handleLogout } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          {userData ? (
            <>
              <span>
                <b>Olá, {userData.name || userData.username}</b>
              </span>
              <button onClick={handleLogout}>Sair</button>
            </>
          ) : (
            <NavLink to="entrar">Entrar</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
