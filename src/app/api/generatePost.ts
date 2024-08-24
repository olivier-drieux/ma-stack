"use server";

import { generatePostQueue } from "@/lib/bullmq/generatePost";
import clientAction from "@/lib/clientAction";
import { db } from "@/lib/drizzle/drizzle";
import { posts } from "@/lib/drizzle/schema/post";
import { generatePostSchema } from "@/lib/zod/generatePostSchema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

export const generatePost = clientAction(generatePostSchema).action(
	async ({ parsedInput: { keyword } }) => {
		const newPostId = (
			await db
				.insert(posts)
				.values({ userId: 1, keyword, status: "in_queue" })
				.$returningId()
		)[0].id;

		generatePostQueue.add("generatePost", { id: newPostId });

		redirect(`/posts/${newPostId}?isGenerating`);
	},
);

export const retryGeneratePost = clientAction(
	z.object({ postId: z.number() }),
).action(async ({ parsedInput: { postId } }) => {
	await db
		.update(posts)
		.set({ status: "in_queue" })
		.where(eq(posts.id, postId));

	const failedJobs = await generatePostQueue.getFailed();

	const failedJobToRetry = failedJobs.find((job) => job.data.id === postId);

	if (!failedJobToRetry) {
		throw new Error("No failed job to retry");
	}

	await failedJobToRetry.retry();

	redirect(`/posts/${postId}?isGenerating`);
});
