import { StackContext, Api, Auth, Config } from "sst/constructs";

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
      // "GET /todo": "packages/functions/src/todo.list",
      // "POST /todo": "packages/functions/src/todo.create",
    },
  });

  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/auth.handler",
    },
  });

  auth.attach(stack, {
    api,
    prefix: "/auth",
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
