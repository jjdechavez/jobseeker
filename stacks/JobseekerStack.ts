import { StackContext, Api, Auth, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      // "GET /todo": "packages/functions/src/todo.list",
      // "POST /todo": "packages/functions/src/todo.create",
    },
  });

  const site = new StaticSite(stack, "Site", {
    path: "web",
    buildCommand: "npm run build",
    buildOutput: "dist",
    environment: {
      VITE_APP_API_URL: api.url,
    },
  })

  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/auth.handler"
    },
  });

  auth.attach(stack, {
    api,
    prefix: "/auth",
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteURL: site.url,
  });
}
