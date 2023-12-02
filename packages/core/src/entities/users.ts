import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { users } from "../drizzle/sql/schema";
import { db } from "../drizzle/sql";

const findUserByEmailSchema = z.string().email();

export const findUserByEmail = z
  .function()
  .args(findUserByEmailSchema)
  .implement(async (userEmail) => {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, userEmail),
    });

    return user;
  });

const insertUserSchema = createInsertSchema(users);

export const createUser = z
  .function()
  .args(insertUserSchema)
  .implement(async (newUser) => {
    const user = await db
      .insert(users)
      .values(newUser)
      .returning({ id: users.id });

    return user[0].id;
  });
