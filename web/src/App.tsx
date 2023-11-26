import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [session, setSession] = useState<string>();

  const getSession = async () => {
    const token = localStorage.getItem("session")
    if (token) {
      setSession(token);
    }
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

  const signOut = () => {
    localStorage.removeItem("session");
    setSession(undefined);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>SST Auth Github</h1>
      <div className="card">
        {session ? (
          <div>
            <p>Yeah! You are signed in.</p>
            <button type="button" onClick={signOut}>Sign out</button>
          </div>
        ) : (
          <a href={`${import.meta.env.VITE_APP_API_URL}/auth/github/authorize`} rel="noreferrer">
            <button>Sign in with Github</button>
          </a>
        )}
      </div>
    </>
  )
}

export default App
