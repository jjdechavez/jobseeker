import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { db } from "../drizzle/sql";
import { countries } from "../drizzle/sql/schema";

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
