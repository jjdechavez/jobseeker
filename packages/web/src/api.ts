import wretch from "wretch";

import { CountryInsert } from "../../packages/core/src/drizzle/sql/schema";

const token = localStorage.getItem("session");

const externalApi = wretch(import.meta.env.VITE_APP_API_URL)
  .auth(`Bearer ${token}`)
  .resolve((r) => r.json());

export const insertCountry = async (newCountry: CountryInsert) => {
  const country = await externalApi.url("/countries").post(newCountry);

  return country;
};
