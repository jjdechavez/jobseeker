import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { db } from "../drizzle/sql";
import { countries } from "../drizzle/sql/schema";
import { eq, like, or } from "drizzle-orm";

export const insertCountrySchema = createInsertSchema(countries, {
  code: z
    .string()
    .length(3, { message: "Code Must be exactly 3 characters long" }),
});

export type InsertCountrySchema = z.infer<typeof insertCountrySchema>;

export const insertCountry = z
  .function()
  .args(insertCountrySchema)
  .implement(async (newCountry) => {
    const country = await db
      .insert(countries)
      .values(newCountry)
      .returning({ id: countries.id });

    return country[0].id;
  });

const findCountryByIdSchema = z
  .union([z.string(), z.number()])
  .pipe(z.coerce.number());

export const findCountryById = z
  .function()
  .args(findCountryByIdSchema)
  .implement(async (countryId) =>
    db.query.countries.findFirst({
      where: (countries, { eq }) => eq(countries.id, countryId),
    })
  );

export const selectCountrySchema = createSelectSchema(countries);

const countryIdSchema = z
  .union([z.string(), z.number()])
  .pipe(z.coerce.number());

const updateCountrySchema = insertCountrySchema
  .pick({
    code: true,
    name: true,
  })
  .optional();

export const updateCountry = z
  .function()
  .args(countryIdSchema, updateCountrySchema)
  .implement(async (countryId, updateWith) =>
    db
      .update(countries)
      .set({ ...updateWith, updatedAt: new Date() })
      .where(eq(countries.id, countryId))
  );

const findCountriesSchema = z.object({
  s: z.string().optional().default(""),
});

export const findCountries = z
  .function()
  .args(findCountriesSchema)
  .implement(async (criteria) => {
    if (criteria.s) {
      return db
        .select({
          id: countries.id,
          code: countries.code,
          name: countries.name,
        })
        .from(countries)
        .where(
          or(like(countries.code, criteria.s), like(countries.name, criteria.s))
        );
    } else {
      return db
        .select({
          id: countries.id,
          code: countries.code,
          name: countries.name,
        })
        .from(countries);
    }
  });

export const deleteCountry = z
  .function()
  .args(countryIdSchema)
  .implement(async (countryId) =>
    db.delete(countries).where(eq(countries.id, countryId))
  );
