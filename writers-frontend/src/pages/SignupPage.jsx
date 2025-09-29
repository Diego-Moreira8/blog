import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router";
import { fetchBlog } from "../utils/fetchBlog";
import { FormProvider, useForm } from "react-hook-form";
import {
  full_name_validation,
  password_confirmation_validation,
  password_validation,
  username_validation,
} from "../utils/inputValidations";
import { Input } from "../components/Input";
import { RouterLink } from "../components/RouterLink";
import { FormContainer } from "../components/FormContainer";
import { H1 } from "../components/Headings";
import { Button } from "../components/Button";
import { Divider } from "../components/Divider";
import { AlertMessage } from "../components/AlertMessage";

export function SignupPage() {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const methods = useForm();

  async function onSubmit(data) {
    setIsFetching(true);

    try {
      const { fullName, username, password, passwordConfirmation } = data;
      const signUpResponse = await fetchBlog("POST", "/auth/register", {
        name: fullName,
        username: username,
        password: password,
        "password-confirmation": passwordConfirmation,
      });

      if (!signUpResponse.ok) {
        const signUpData = await signUpResponse.json();
        const usernameTaken = signUpData.formErrors?.find((error) => {
          return error.msg === "Username already exists in the database";
        });

        if (usernameTaken) {
          return setSubmitStatus(
            `O nome de usuário "${usernameTaken.value}" já existe, tente outro.`,
          );
        }

        return setSubmitStatus(
          "Houve um problema durante o registro, tente novamente.",
        );
      }

      setSubmitStatus("Conta criada com sucesso! Autenticando...");

      const loginResponse = await fetchBlog("POST", "/auth/login", {
        username,
        password,
      });

      if (!loginResponse.ok) {
        return setSubmitStatus(
          "Sua conta foi criada mas houve um problema durante o login.",
        );
      }

      const { user } = await loginResponse.json();

      handleLogin(user);
      navigate("/");
    } catch (error) {
      setSubmitStatus("Houve um problema durante o registro, tente novamente.");
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <FormContainer>
      <H1>Criar uma Conta</H1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {submitStatus && <AlertMessage>{submitStatus}</AlertMessage>}

          <Input {...full_name_validation} />
          <Input {...username_validation} />
          <Input {...password_validation} />
          <Input {...password_confirmation_validation} />

          <Button type="submit" disabled={isFetching} centered={true}>
            {isFetching ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>
      </FormProvider>

      <Divider />

      <p className="text-center">
        <b>Já tem uma conta? </b>
        <RouterLink to="/entrar">Entre com a sua conta</RouterLink>
      </p>
    </FormContainer>
  );
}
