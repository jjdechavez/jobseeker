import { migrate } from "@jobseeker/core/drizzle/sql";
import { ApiHandler } from "sst/node/api";
import server from "@jobseeker/core/env/server";

export const handler = ApiHandler(async (_evt) => {
  console.log(`Migrating to ${server.DATABASE_URL} ...`);
  await migrate();

  return {
    body: "Migrated!",
  };
});
