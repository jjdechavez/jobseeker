import { useSession, signOut } from "next-auth/react";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  let displayName = null;
  let authenticatedLinks = <li>Sign in</li>;

  if (status === "loading") {
    displayName = "Fetching user";
  } else if (status === "authenticated") {
    displayName = session.user.name;
    authenticatedLinks = (
      <>
        <li>{displayName}</li>
        <li>
          <button type="button" onClick={() => signOut()}>
            Sign out
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <nav>
        <ul>
          <li>Home</li>
          {authenticatedLinks}
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
}
