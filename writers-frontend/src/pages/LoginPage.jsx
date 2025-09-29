import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router";
import { fetchBlog } from "../utils/fetchBlog";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { RouterLink } from "../components/RouterLink";
import { H1 } from "../components/Headings";
import { FormContainer } from "../components/FormContainer";
import { Button } from "../components/Button";
import { Divider } from "../components/Divider";
import { AlertMessage } from "../components/AlertMessage";

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
            "Houve um problema durante o login, tente novamente.",
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
    <FormContainer>
      <H1>Entrar na Minha Conta</H1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {submitStatus && <AlertMessage>{submitStatus}</AlertMessage>}

          <Input
            label="Nome de usuário:"
            id="username"
            name="username"
            autoComplete="username"
            validation={{
              required: { value: true, message: "Campo obrigatório" },
            }}
          />

          <Input
            label="Senha:"
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            validation={{
              required: { value: true, message: "Campo obrigatório" },
            }}
          />

          <Button type="submit" disabled={isFetching} centered={true}>
            {isFetching ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </FormProvider>

      <Divider />

      <p className="text-center">
        <b>Ainda não tem uma conta? </b>
        <RouterLink to="/criar-conta">Criar uma conta</RouterLink>
      </p>
    </FormContainer>
  );
}
