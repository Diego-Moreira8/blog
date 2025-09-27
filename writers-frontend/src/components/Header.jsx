import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { UserMenu } from "./UserMenu";
import { Logo } from "./Logo";

export function Header() {
  const { userData } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between p-2 shadow-sm">
      <Logo />
      {userData && <UserMenu />}
    </header>
  );
}
