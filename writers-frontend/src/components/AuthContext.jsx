import { createContext, useEffect, useState } from "react";
import { authToken } from "../utils/authToken";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authToken.get());
  }, []);

  function storeAuthToken(token) {
    authToken.set(token);
    setIsAuthenticated(true);
  }

  function removeAuthToken() {
    authToken.remove();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext value={{ isAuthenticated, storeAuthToken, removeAuthToken }}>
      {children}
    </AuthContext>
  );
}
