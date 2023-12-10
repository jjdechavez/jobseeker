import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Entity } from "./entity";

export const countries = sqliteTable(
  "countries",
  {
    ...Entity.defaults,
    name: text("name").notNull(),
    code: text("code", { length: 2 }).notNull().unique(),
  },
  (table) => {
    return {
      codeIdx: index("code_index").on(table.code),
    };
  }
);

export type CountrySelect = typeof countries.$inferSelect;
export type CountryInsert = typeof countries.$inferInsert;
