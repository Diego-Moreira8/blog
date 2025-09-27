import { Link } from "react-router";

export function RouterLink({ to, children }) {
  return (
    <Link className="text-blue-800 hover:underline" to={to}>
      {children}
    </Link>
  );
}
