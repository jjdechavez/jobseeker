import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [session, setSession] = useState<{
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
  }>();
  const [loading, setLoading] = useState(true);

  const getSession = async () => {
    const token = localStorage.getItem("session");
    if (token) {
      const user = await getUserInfo(token);
      if (user) setSession(user);
    }

    setLoading(false);
  };

  useEffect(() => {
    getSession();
  }, []);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("session", token);
      window.location.replace(window.location.origin);
    }
  }, []);

  const getUserInfo = async (session: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/session`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      );

      return response.json();
    } catch (error) {
      alert(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem("session");
    setSession(undefined);
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <>
      <Button>Click me</Button>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        {session ? (
          <div className="profile">
            <p>Welcome {session.name}</p>
            <img
              src={session.avatarUrl}
              style={{ borderRadius: "50%" }}
              width={100}
              height={100}
              alt=""
            />
            <p>{session.email}</p>
            <button type="button" onClick={signOut}>
              Sign out
            </button>
          </div>
        ) : (
          <a
            href={`${import.meta.env.VITE_APP_API_URL}/auth/github/authorize`}
            rel="noreferrer"
          >
            <button>Sign in with Github</button>
          </a>
        )}
      </div>
    </>
  );
}

export default App;
