import { Config as SSTConfig } from "sst/node/config";
import type { Config } from "drizzle-kit";

const isProduction = SSTConfig.STAGE === "production";

export default {
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/sql/schema.ts",
  verbose: true,
  driver: isProduction ? "turso" : "libsql",
  strict: true,
} satisfies Config;
