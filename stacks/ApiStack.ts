import { StackContext, Api, Config } from "sst/constructs";

export function ApiStack({ stack }: StackContext) {
  const secrets = Config.Secret.create(
    stack,
    "DATABASE_URL",
    "DATABASE_AUTH_TOKEN",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET"
  );

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [
          secrets.DATABASE_URL,
          secrets.DATABASE_AUTH_TOKEN,
          secrets.GITHUB_CLIENT_ID,
          secrets.GITHUB_CLIENT_SECRET,
        ],
        nodejs: {
          install: ["@libsql/linux-x64-gnu"],
        },
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "POST /migration": {
        function: {
          handler: "packages/functions/src/migrator.handler",
          description: "This is the migrator function",
        },
      },
      "GET /session": {
        function: {
          handler: "packages/functions/src/session.handler",
          description: "Get authenticated by session",
        },
      },
      "POST /countries": {
        function: {
          handler: "packages/functions/src/countries.create",
          description: "Create country",
        },
      },
      "GET /countries/{id}": {
        function: {
          handler: "packages/functions/src/countries.findById",
          description: "Get country by id",
        },
      },
      "PUT /countries/{id}": {
        function: {
          handler: "packages/functions/src/countries.update",
          description: "Update country by id",
        },
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
    DATABASE_URL: secrets.DATABASE_URL,
    DATABASE_AUTH_TOKEN: secrets.DATABASE_AUTH_TOKEN,
  };
}
