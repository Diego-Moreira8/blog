import { Link } from "react-router";

export function Logo() {
  return (
    <Link className="p-1 text-2xl font-bold italic" to="/">
      Blog
    </Link>
  );
}
