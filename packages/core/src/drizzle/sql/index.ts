import { createClient } from "@libsql/client/web";
import { createClient as createLocalClient } from "@libsql/client";
import { drizzle as DrizzleLibSQL } from "drizzle-orm/libsql";
import { migrate as migrateLibSQL } from "drizzle-orm/libsql/migrator";
import { join } from "path";
import * as schema from "./schema";
import server from "../../env/server";

const { isProduction, DATABASE_URL, DATABASE_AUTH_TOKEN } = server;

const client = isProduction
  ? createClient({
      url: DATABASE_URL,
      authToken: DATABASE_AUTH_TOKEN,
    })
  : createLocalClient({ url: DATABASE_URL });

export const db = DrizzleLibSQL(client, { schema });

export const migrate = async () => {
  const folder = isProduction
    ? "drizzle/migrations"
    : "packages/core/src/drizzle/migrations";

  return migrateLibSQL(db, {
    migrationsFolder: join(process.cwd(), folder),
  });
};
