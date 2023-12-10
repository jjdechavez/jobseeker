import { createClient } from "@libsql/client/web";
import { createClient as createLocalClient } from "@libsql/client";
import { drizzle as DrizzleLibSQL } from "drizzle-orm/libsql";
import { migrate as migrateLibSQL } from "drizzle-orm/libsql/migrator";
import { Config } from "sst/node/config";
import { join } from "path";
import * as schema from "./schema";

const stage = Config.STAGE;
const isProduction = stage === "production";

const client = isProduction
  ? createClient({
      url: Config.DATABASE_URL,
      authToken: Config.DATABASE_AUTH_TOKEN,
    })
  : createLocalClient({ url: "file:./jobseeker.db" });

export const db = DrizzleLibSQL(client, { schema });

export const migrate = async () => {
  const folder = isProduction
    ? "drizzle/migrations"
    : "packages/core/src/drizzle/migrations";

  return migrateLibSQL(db, {
    migrationsFolder: join(process.cwd(), folder),
  });
};
