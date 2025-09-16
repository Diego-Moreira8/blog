import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link, useNavigate } from "react-router";
import { fetchBlog } from "../utils/fetchBlog";

export function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [status, setStatus] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { storeAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setIsFetching(true);
    e.preventDefault();

    try {
      const signUpResponse = await fetchBlog("POST", "/auth/register", {
        name: fullName,
        username: username,
        password: password,
        "password-confirmation": passwordConfirmation,
      });

      if (!signUpResponse.ok) {
        return setStatus(
          "Houve um problema durante o registro, tente novamente."
        );
      }

      setStatus("Conta criada com sucesso! Autenticando...");

      const loginResponse = await fetchBlog("POST", "/auth/login", {
        username,
        password,
      });

      if (!loginResponse.ok) {
        setStatus(
          "Sua conta foi criada mas houve um problema durante o login."
        );
        return;
      }

      const { token } = await loginResponse.json();

      storeAuthToken(token);
      navigate("/");
    } catch (error) {
      setStatus("Houve um problema durante o registro, tente novamente.");
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <div>
      <p>
        <b>Criar uma conta.</b>
      </p>

      <form onSubmit={handleSubmit}>
        {status && <p>{status}</p>}

        <div>
          <label htmlFor="fullName">Seu nome:</label>
          <input
            type="text"
            name="name"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="username">Nome de usuário:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="passwordConfirmation">Repita a senha:</label>
          <input
            type="password"
            name="password-confirmation"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" disabled={isFetching}>
            Criar conta
          </button>
        </div>
      </form>

      <hr />

      <p>
        <b>Já tenho uma conta.</b>
      </p>
      <Link to="/entrar">Entrar</Link>
    </div>
  );
}
