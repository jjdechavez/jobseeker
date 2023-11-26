import 'dotenv/config'
import { AuthHandler, GithubAdapter, Session } from "sst/node/auth";

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userID: string;
    }
  }
}

export const handler = AuthHandler({
  providers: {
    github: GithubAdapter({
      clientID: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      scope: "read:user user:email",
      onSuccess: async (tokenset) => {
        // We cannot use tokenset.claims() it's only available for OIDC providers like google;
        // While Github does not supported that's why we needed to fetch the data from their API.
        // Result of tokenset: { access_token: string, token_type: 'bearer', scope: 'read:user, read:email' }
        const response = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${tokenset.access_token}`,
          }
        });
        const githubUser = await response.json() as { id: number, email: string; avatar_url: string; };
        return Session.parameter({
          redirect: "http://localhost:5173",
          type: "user",
          properties: {
            userID: githubUser.id.toString(),
          }
        })
      }
    })
  }
});
