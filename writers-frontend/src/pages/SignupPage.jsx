import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link, useNavigate } from "react-router";
import { fetchBlog } from "../utils/fetchBlog";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import {
  full_name_validation,
  password_confirmation_validation,
  password_validation,
  username_validation,
} from "../utils/inputValidations";

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
            `O nome de usuário "${usernameTaken.value}" já existe, tente outro.`
          );
        }

        return setSubmitStatus(
          "Houve um problema durante o registro, tente novamente."
        );
      }

      setSubmitStatus("Conta criada com sucesso! Autenticando...");

      const loginResponse = await fetchBlog("POST", "/auth/login", {
        username,
        password,
      });

      if (!loginResponse.ok) {
        return setSubmitStatus(
          "Sua conta foi criada mas houve um problema durante o login."
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
    <div>
      <p>
        <b>Criar uma conta.</b>
      </p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <p>{submitStatus}</p>

          <Input {...full_name_validation} />
          <Input {...username_validation} />
          <Input {...password_validation} />
          <Input {...password_confirmation_validation} />

          <div>
            <button type="submit" disabled={isFetching}>
              {isFetching ? "Criando conta..." : "Criar conta"}
            </button>
          </div>
        </form>
      </FormProvider>

      <hr />

      <p>
        <b>Já tenho uma conta.</b>
      </p>
      <Link to="/entrar">Entrar</Link>
    </div>
  );
}
