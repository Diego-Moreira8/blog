import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link, useNavigate } from "react-router";
import { fetchBlog } from "../utils/fetchBlog";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { storeAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setIsFetching(true);
    e.preventDefault();

    try {
      const response = await fetchBlog("POST", "/auth/login", {
        username,
        password,
      });

      if (!response.ok) {
        if (response.status === 400) {
          setStatus("Nome de usuário ou senha incorretos.");
        } else {
          setStatus("Houve um problema durante o login, tente novamente.");
        }

        return;
      }

      const { token } = await response.json();

      storeAuthToken(token);
      navigate("/");
    } catch (error) {
      setStatus("Houve um problema durante o login, tente novamente.");
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <div>
      <p>
        <b>Já tenho uma conta.</b>
      </p>

      <form onSubmit={handleSubmit}>
        <p>{status}</p>

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
          <button type="submit" disabled={isFetching}>
            Entrar
          </button>
        </div>
      </form>

      <hr />

      <p>
        <b>Ainda não tenho uma conta.</b>
        <br />
        Crie uma conta e interaja com postagens, escolha um tema e muito mais!
      </p>
      <Link to="/criar-conta">Criar Conta</Link>
    </div>
  );
}
