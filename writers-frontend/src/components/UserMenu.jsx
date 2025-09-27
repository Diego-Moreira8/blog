import { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa6";
import cn from "classnames";
import { Nav } from "./Nav";

export function UserMenu() {
  const [navVisible, setNavVisible] = useState(false);
  const userMenuRef = useRef(null);

  const toggleNav = () => setNavVisible(!navVisible);
  const closeNav = () => setNavVisible(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        closeNav();
      }
    }
    function handleEscKey(e) {
      if (e.key === "Escape") closeNav();
    }
    if (navVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [navVisible]);

  return (
    <div className="relative" ref={userMenuRef}>
      <button
        onClick={toggleNav}
        className={cn(
          "relative flex items-center rounded-full p-2 transition-colors hover:bg-gray-200",
          navVisible && "bg-gray-200",
        )}
        aria-haspopup="menu"
        aria-expanded={navVisible}
        aria-controls="user-menu"
      >
        <FaUser />
        <span className="sr-only">Abrir menu de usuário</span>
      </button>

      {navVisible && <Nav navVisible={navVisible} closeNav={closeNav} />}
    </div>
  );
}
