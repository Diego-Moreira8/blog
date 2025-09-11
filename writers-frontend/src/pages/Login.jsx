import { useContext } from "react";
import { LoginForm } from "../components/LoginForm";
import { AuthContext } from "../components/AuthContext";

export function Login() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <h1>Login</h1>
      {isAuthenticated ? <p>Já autenticado!</p> : <LoginForm />}
    </div>
  );
}
