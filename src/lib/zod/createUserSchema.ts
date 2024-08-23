import { z } from "zod";

export const createUserSchema = z
	.object({
		username: z.string().min(3).max(10),
		email: z.string().email(),
		password: z.string().min(8).max(100),
		confirmPassword: z.string().min(8).max(100),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type CreateUser = z.infer<typeof createUserSchema>;
