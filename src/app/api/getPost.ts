"use server";

import { db } from "@/lib/drizzle/drizzle";
import { posts } from "@/lib/drizzle/schema/post";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function getPost(postId: number) {
	// await new Promise((resolve) => setTimeout(resolve, 3000));
	const existingPost = await db
		.select()
		.from(posts)
		.where(eq(posts.id, postId));

	if (1 !== existingPost.length) {
		return notFound();
	}

	return existingPost[0];
}
