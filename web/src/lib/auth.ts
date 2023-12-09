import { UserSelect } from "../../../packages/core/src/drizzle/sql/schema";

export interface GetSession {
  session: UserSelect;
}

export const getSession = async (session: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/session`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );

    return response.json() as Promise<UserSelect | undefined>;
  } catch (error) {
    console.error(error);
  }
};
