import { createContext, useEffect, useState } from "react";
import { userInfo } from "../utils/userInfo.js";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(JSON.parse(userInfo.get()));
  }, []);

  function handleLogin(data) {
    userInfo.set(JSON.stringify(data));
    setUserData(data);
  }

  function handleLogout() {
    userInfo.remove();
    setUserData(null);
  }

  return (
    <AuthContext value={{ userData, handleLogin, handleLogout }}>
      {children}
    </AuthContext>
  );
}
