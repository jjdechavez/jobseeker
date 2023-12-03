import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";
import { findUserById } from "@jobseeker/core/entities/users";

export const handler = ApiHandler(async () => {
  const session = useSession();

  if (session.type !== "user") {
    throw new Error("Not authenticated");
  }

  const user = await findUserById(session.properties.userID);

  return {
    statusCode: 200,
    body: JSON.stringify(user),
  };
});
