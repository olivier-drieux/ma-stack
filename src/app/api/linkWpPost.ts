"use server";

import clientAction from "@/lib/clientAction";
import { db } from "@/lib/drizzle/drizzle";
import { posts } from "@/lib/drizzle/schema/post";
import wordpress from "@/lib/wordpress";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const linkWpPost = clientAction(z.object({ postId: z.number() })).action(
	async ({ parsedInput: { postId } }) => {
		if (!process.env.WORDPRESS_API_URL) {
			throw new Error("WORDPRESS_API_URL is not set");
		}

		const existingPost = await db
			.select()
			.from(posts)
			.where(eq(posts.wordPressId, postId));

		if (0 !== existingPost.length) {
			return;
		}

		const data = await wordpress.posts().id(postId).get();

		const newPost = await db.insert(posts).values({
			userId: 1,
			wordPressId: postId,
			status: data.status,
			title: data.title.rendered,
			content: data.content.rendered,
		});

		revalidatePath("/posts");

		return newPost;
	},
);
