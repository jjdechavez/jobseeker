import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import RootPage from "./routes/root.tsx";
import ErrorPage from "./routes/error-page.tsx";
import Contact from "./routes/contact.tsx";
import SigninPage from "./routes/signin.tsx";
import SettingsLayout from "./routes/settings/layout.tsx";
import SettingsCountriesPage from "./routes/settings/countries.tsx";

import { getSession } from "./lib/auth.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const token = localStorage.getItem("session");
      if (token) {
        const session = await getSession(token);
        return { session };
      }

      return redirect("/signin");
    },
    children: [
      {
        path: "settings",
        element: <SettingsLayout />,
        children: [
          {
            index: true,
            path: "countries",
            element: <SettingsCountriesPage />,
          },
        ],
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/oauth/github",
    loader: () => {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const signinToken = params.get("token");
      if (signinToken) {
        localStorage.setItem("session", signinToken);
      }

      return redirect("/");
    },
  },
  {
    path: "/signin",
    element: <SigninPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signout",
    action: () => {
      localStorage.removeItem("session");
      return redirect("/signin");
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<p>Initial load...</p>} />
  </React.StrictMode>
);
