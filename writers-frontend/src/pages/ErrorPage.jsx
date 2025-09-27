import { RouterLink } from "../components/RouterLink";

export function ErrorPage() {
  return (
    <div className="text-center">
      <p className="mb-4 text-2xl">Ops... Não encontramos esta página!</p>
      <RouterLink to="/">Voltar para a página inicial</RouterLink>
    </div>
  );
}
