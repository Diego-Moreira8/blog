import { useState } from "react";

export function LoginForm({ onSuccessAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  async function handleSubmit(e) {
    setIsFetching(true);
    e.preventDefault();
    const body = new URLSearchParams({ username, password });

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
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

      onSuccessAuth(token);
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
        {status && <p>{status}</p>}

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
    </div>
  );
}
