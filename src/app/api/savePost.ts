"use server";

import clientAction from "@/lib/clientAction";
import { db } from "@/lib/drizzle/drizzle";
import { posts } from "@/lib/drizzle/schema/post";
import wordpress from "@/lib/wordpress";
import { editPostSchema } from "@/lib/zod/editPostSchema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const editPostServerSchema = editPostSchema.extend({
	postId: z.number(),
	publish: z.boolean().default(false),
});

export const savePost = clientAction(editPostServerSchema).action(
	async ({ parsedInput: { postId, title, content, publish } }) => {
		// Update the post in the database
		await db.update(posts).set({ title, content }).where(eq(posts.id, postId));
		// Get the post from the database
		const post = (await db.select().from(posts).where(eq(posts.id, postId)))[0];

		// Update the post in WordPress if it has a WordPress ID
		if (post.wordPressId) {
			await wordpress.posts().id(post.wordPressId).update({
				title: post.title,
				content: post.content,
			});
		}
		// Create the post in WordPress if it doesn't have a WordPress ID and publish is true
		else if (publish) {
			try {
				const result = await wordpress.posts().create({
					title: post.title,
					content: post.content,
					status: "publish",
				});

				await db
					.update(posts)
					.set({ wordPressId: result.id })
					.where(eq(posts.id, postId));
			} catch (error) {
				console.error("Error creating post in WordPress", error);
			}
		}

		revalidatePath("/posts");

		return post;
	},
);
