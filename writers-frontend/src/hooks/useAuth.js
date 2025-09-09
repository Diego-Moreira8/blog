import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  function login(token) {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  }

  return {
    isAuthenticated,
    login,
    logout,
  };
}
