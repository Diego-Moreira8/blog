import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";

export function Login() {
  const { isAuthenticated, login, logout } = useAuth();

  return isAuthenticated ? (
    <div>
      <p>Já autenticado!</p>
      <button onClick={logout}>Sair</button>
    </div>
  ) : (
    <LoginForm onSuccessAuth={login} />
  );
}
