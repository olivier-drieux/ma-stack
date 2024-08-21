"use server";

import { db } from "@/lib/drizzle/drizzle";
import { users } from "@/lib/drizzle/schema/user";
import { testQueue } from "@/lib/queue";
import { createUserSchema } from "@/lib/zod/createUserSchema";
import { eq } from "drizzle-orm";
import {
	createSafeActionClient,
	flattenValidationErrors,
} from "next-safe-action";
import { zodAdapter } from "next-safe-action/adapters/zod";

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

export const createUser = createSafeActionClient({
	validationAdapter: zodAdapter(),
})
	.schema(serverSchema, {
		handleValidationErrorsShape: (ve) =>
			flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput }) => {
		console.log("Add User creation to queue");
		const job = await testQueue.add("createUser", parsedInput);
		console.log("Job added", job.id);
	});
