import { Config } from "sst/node/config";

const isProduction = Config.STAGE === "production";

const server = {
  isProduction,
  devMode: process.env.IS_LOCAL,
  DATABASE_URL: isProduction ? Config.DATABASE_URL : "file:./jobseeker.db",
  DATABASE_AUTH_TOKEN: isProduction ? Config.DATABASE_AUTH_TOKEN : undefined,
};

export default server;
