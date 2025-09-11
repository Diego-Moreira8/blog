import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const AUTH_TOKEN_KEY = "authToken";

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem(AUTH_TOKEN_KEY));
  }, []);

  function storeAuthToken(token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setIsAuthenticated(true);
  }

  function removeAuthToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext value={{ isAuthenticated, storeAuthToken, removeAuthToken }}>
      {children}
    </AuthContext>
  );
}
