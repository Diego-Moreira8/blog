import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link, useNavigate } from "react-router";
import { fetchBlog } from "../utils/fetchBlog";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../components/Input";

export function LoginPage() {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const methods = useForm();

  async function onSubmit(data) {
    setIsFetching(true);

    try {
      const response = await fetchBlog("POST", "/auth/login", data);

      if (!response.ok) {
        if (response.status === 400) {
          setSubmitStatus("Nome de usuário ou senha incorretos.");
        } else {
          setSubmitStatus(
            "Houve um problema durante o login, tente novamente."
          );
        }
        return;
      }
      const { user } = await response.json();
      handleLogin(user);
      navigate("/");
    } catch (error) {
      setSubmitStatus("Houve um problema durante o login, tente novamente.");
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

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <p>{submitStatus}</p>

          <Input
            label="Nome de usuário:"
            id="username"
            name="username"
            validation={{
              required: { value: true, message: "Campo obrigatório" },
            }}
          />

          <Input
            label="Senha:"
            type="password"
            id="password"
            name="password"
            validation={{
              required: { value: true, message: "Campo obrigatório" },
            }}
          />

          <div>
            <button type="submit" disabled={isFetching}>
              {isFetching ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </FormProvider>

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
