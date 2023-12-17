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
import SettingsCountriesPage, {
  loader as settingCountriesLoader,
} from "./routes/settings/countries/countries-page.tsx";
import SettingsCountryNewPage, {
  action as settingCountriesAction,
} from "./routes/settings/countries/country-new.tsx";
import SettingsCountryEditPage, {
  loader as settingCountryLoader,
  action as settingCountryEditAction,
} from "./routes/settings/countries/country-edit.tsx";

import { getSession } from "./lib/auth.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const token = localStorage.getItem("session");
      if (token) {
        // const session = await getSession(token);
        const defaultSession = {
          id: 1,
          createdAt: "2023-12-10T07:53:56.000Z",
          updatedAt: null,
          name: "John Jerald E. De Chavez",
          email: "dechavezjohnjerald029@gmail.com",
          avatarUrl: "https://avatars.githubusercontent.com/u/46374990?v=4",
          providerId: 46374990,
        };
        return { session: defaultSession };
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
            loader: settingCountriesLoader,
            action: settingCountriesAction,
          },
          {
            path: "countries/new",
            element: <SettingsCountryNewPage />,
            loader: settingCountriesLoader,
            action: settingCountriesAction,
          },
          {
            path: "countries/:countryId/edit",
            element: <SettingsCountryEditPage />,
            loader: settingCountryLoader,
            action: settingCountryEditAction,
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
