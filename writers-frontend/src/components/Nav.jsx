import { useContext, useRef, useEffect } from "react";
import { NavLink } from "react-router";
import cn from "classnames";
import { AuthContext } from "./AuthContext";

export function Nav({ navVisible, closeNav }) {
  const { userData, handleLogout } = useContext(AuthContext);
  const firstItemRef = useRef(null);

  useEffect(() => {
    if (navVisible) {
      firstItemRef.current?.focus();
    }
  }, [navVisible]);

  return (
    <nav
      className="absolute top-9 right-0 w-max rounded-sm border-1 border-gray-200 bg-gray-100 py-4 shadow-md"
      id="user-menu"
      role="menu"
    >
      <ul className="flex flex-col text-right">
        <li>
          <div
            className="max-w-[200px] overflow-hidden px-4 py-1 text-nowrap overflow-ellipsis md:max-w-[300px]"
            role="presentation"
          >
            <b>Olá, {userData.name || userData.username}!</b>
          </div>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(
                "block w-full px-4 py-1 text-right transition-colors hover:bg-gray-200",
                isActive && "font-bold",
              )
            }
            to="/home"
            onClick={closeNav}
            ref={firstItemRef}
            role="menuitem"
          >
            Início
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              cn(
                "block w-full px-4 py-1 text-right transition-colors hover:bg-gray-200",
                isActive && "font-bold",
              )
            }
            to="/perfil"
            onClick={closeNav}
            role="menuitem"
          >
            Meu Perfil
          </NavLink>
        </li>
        <li>
          <button
            className="block w-full px-4 py-1 text-right transition-colors hover:bg-gray-200"
            onClick={handleLogout}
            role="menuitem"
          >
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
}
