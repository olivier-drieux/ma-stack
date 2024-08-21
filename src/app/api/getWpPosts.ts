"use server";

import { db } from "@/lib/drizzle/drizzle";
import { posts } from "@/lib/drizzle/schema/post";
import { inArray } from "drizzle-orm";
import wpApi from "wpapi";

interface WpPost {
	id: number;
	title: { rendered: string };
	content: { rendered: string };
	status: "publish" | "draft" | "future";
	link: string;
}

export default async function getWpPosts() {
	const wp = new wpApi({
		endpoint: "http://localhost:8080/wp-json/",
	});

	const wpPosts: Array<WpPost> = await wp.posts().get();

	const dbPosts = await db
		.select()
		.from(posts)
		.where(
			inArray(
				posts.wordPressId,
				wpPosts.map((wpPost) => wpPost.id),
			),
		);

	const mappedPosts = wpPosts.map((wpPost) => {
		const dbPost = dbPosts.find((dbPost) => dbPost.wordPressId === wpPost.id);
		return {
			...wpPost,
			post: dbPost ?? null,
		};
	});

	return mappedPosts;
}
