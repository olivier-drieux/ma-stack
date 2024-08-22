import { z } from "zod";

export const generatePostSchema = z.object({
	keyword: z.string().min(1),
});

export type GeneratePostSchema = z.infer<typeof generatePostSchema>;
