"use server";

import clientAction from "@/lib/clientAction";
import { db } from "@/lib/drizzle/drizzle";
import { users } from "@/lib/drizzle/schema/user";
import { createUserSchema } from "@/lib/zod/createUserSchema";
import { eq } from "drizzle-orm";

const serverSchema = createUserSchema
	.refine(
		async (data) => {
			const existingUsername = await db
				.select()
				.from(users)
				.where(eq(users.username, data.username));
			return 0 === existingUsername.length;
		},
		{
			message: "Username already exists",
			path: ["username"],
		},
	)
	.refine(
		async (data) => {
			const existingEmail = await db
				.select()
				.from(users)
				.where(eq(users.email, data.email));
			return 0 === existingEmail.length;
		},
		{
			message: "Email already exists",
			path: ["email"],
		},
	);

export const createUser = clientAction(serverSchema).action(
	async ({ parsedInput }) => {
		await new Promise((resolve) => setTimeout(resolve, 10000));
		await db.insert(users).values(parsedInput);
	},
);
