"use server";

import { generatePostQueue } from "@/lib/bullmq/generatePost";
import clientAction from "@/lib/clientAction";
import { db } from "@/lib/drizzle/drizzle";
import { posts } from "@/lib/drizzle/schema/post";
import { generatePostSchema } from "@/lib/zod/generatePostSchema";
import { redirect } from "next/navigation";

export const generatePost = clientAction(generatePostSchema).action(
	async ({ parsedInput: { keyword } }) => {
		const newPostId = (
			await db.insert(posts).values({ userId: 1, keyword }).$returningId()
		)[0].id;

		generatePostQueue.add("generatePost", { id: newPostId });

		redirect(`/posts/${newPostId}`);
	},
);
