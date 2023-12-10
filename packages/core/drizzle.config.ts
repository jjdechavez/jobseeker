import type { Config } from "drizzle-kit";

// Issue 'Top-level await is currently not supported with the "cjs" output format
// Solution: Remove SST Config on drizzle.config.ts; due to Config is Async

export default {
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/sql/schema.ts",
  verbose: true,
  driver: process.env.IS_LOCAL ? "libsql" : "turso",
  strict: true,
} satisfies Config;
