import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Entity } from "./entity";

export const users = sqliteTable("users", {
  ...Entity.defaults,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatarUrl: text("avatar_url").notNull(),
  providerId: integer("provider_id").notNull()
});

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
