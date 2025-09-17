import { Link } from "react-router";

export function ErrorPage() {
  return (
    <div>
      <p>Ops... Não encontramos esta página!</p>
      <Link to="/">Voltar para a página inicial</Link>
    </div>
  );
}
