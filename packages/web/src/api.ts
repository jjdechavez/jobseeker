import wretch from "wretch";
import { z } from "zod";

import { CountryInsert } from "../../core/src/drizzle/sql/schema";

const token = localStorage.getItem("session");

const externalApi = wretch(import.meta.env.VITE_APP_API_URL).auth(
  `Bearer ${token}`
);

export const insertCountry = async (newCountry: CountryInsert) => {
  const schema = z.object({
    id: z.number(),
  });
  const country = await externalApi
    .url("/countries")
    .json(newCountry)
    .post()
    .json(schema.safeParse);

  return country;
};

export const findCountryById = async (countryId: string) => {
  const schema = z.object({
    data: z.object({
      id: z.number(),
      code: z.string(),
      name: z.string(),
      createdAt: z.string().pipe(z.coerce.date()),
      updatedAt: z.nullable(z.string().pipe(z.coerce.date())),
    }),
  });

  const country = await externalApi
    .url(`/countries/${countryId}`)
    .get()
    .json(schema.safeParse);

  return country;
};

export const updateCountry = async (
  countryId: string,
  updateWith: { code: string; name: string }
) => {
  await externalApi
    .url(`/countries/${countryId}`)
    .json(updateWith)
    .put()
    .json();
};

export const getCountries = async (search?: string) => {
  const schema = z.object({
    data: z.array(
      z.object({
        id: z.number(),
        code: z.string(),
        name: z.string(),
      })
    ),
  });

  const countriesUrl = new URL("/countries", externalApi._url);
  if (search) {
    countriesUrl.searchParams.set("s", search);
  }

  const countries = await externalApi
    .url(countriesUrl.href, true)
    .get()
    .json(schema.safeParse);

  return countries;
};
