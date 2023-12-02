import { integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export * as Entity from "./entity";

export const defaults = {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: integer("created_at", {
    mode: "timestamp",
  })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", {
    mode: "timestamp",
  }),
};
