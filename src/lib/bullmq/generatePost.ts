import type { Database } from "@/lib/drizzle/drizzle";
import { posts } from "@/lib/drizzle/schema/post";
import openAi from "@/lib/openAi";
import { connection } from "@/lib/redis";
import { type Job, Queue } from "bullmq";
import { eq } from "drizzle-orm";

export const generatePostQueue = new Queue<{ id: number }>("generatePost", {
	connection,
	defaultJobOptions: {
		attempts: 2,
		backoff: {
			type: "exponential",
			delay: 5000,
		},
	},
});

export const generatePostJob = async (
	job: Job<{ id: number }>,
	db: Database,
) => {
	job.log("Retrieving post...");

	const post = (
		await db.select().from(posts).where(eq(posts.id, job.data.id))
	)[0];

	if (!post) {
		job.log(`Post n°${job.data.id} not found`);
		throw new Error(`Post n°${job.data.id} not found`);
	}

	try {
		if (post.status !== "in_queue") {
			job.log(`Post n°${job.data.id} is not in "in_queue" status`);
			throw new Error(`Post n°${job.data.id} is not in "in_queue" status`);
		}

		if (!post.keyword) {
			job.log(`Post n°${job.data.id} has no keyword`);
			throw new Error(`Post n°${job.data.id} has no keyword`);
		}

		job.log("Generating post...");

		await db
			.update(posts)
			.set({ status: "generating" })
			.where(eq(posts.id, post.id))
			.execute();

		const titlePrompt = getPromptForTitle(post.keyword);
		const title = (
			await openAi.chat.completions.create({
				model: "gpt-4o",
				messages: [
					{ role: "system", content: titlePrompt.system },
					{ role: "user", content: titlePrompt.user },
				],
			})
		).choices[0].message.content;

		if (!title) {
			job.log("Failed to generate title");
			throw new Error("Failed to generate title");
		}

		const contentPrompt = getPromptForContent(post.keyword, title);
		const content = (
			await openAi.chat.completions.create({
				model: "gpt-4o",
				messages: [
					{ role: "system", content: contentPrompt.system },
					{ role: "user", content: contentPrompt.user },
				],
			})
		).choices[0].message.content;

		if (!content) {
			job.log("Failed to generate content");
			throw new Error("Failed to generate content");
		}

		await db
			.update(posts)
			.set({
				title,
				content,
				status: "generated",
			})
			.where(eq(posts.id, post.id));

		job.log("Post generated");
	} catch (error) {
		await db
			.update(posts)
			.set({ status: "failed" })
			.where(eq(posts.id, post.id));

		throw error;
	}
};

const getPromptForTitle = (keyword: string) => {
	return {
		system:
			"Tu es un expert en marketing digital, tu es professionnel de l'e-commerce et tu es expert en la création de contenu pour article de blog.",
		user: `
        Tu dois créer un titre pour un article de blog sur le sujet "${keyword}".
        Le titre doit être en français.
        Le titre doit être original.
        Le titre doit être court et concis.
        Le titre doit être attractif et inciter à la lecture.
        `,
	};
};

const getPromptForContent = (keyword: string, title: string) => {
	return {
		system:
			"Tu es un expert en marketing digital, tu es professionnel de l'e-commerce et tu es expert en la création de contenu pour article de blog.",
		user: `
        Tu dois créer le contenu de la balise HTML <body> d'un article de blog sur le sujet "${keyword}" dont le titre est "${title}".
        L'article doit contenir au moins 1000 mots.
        L'article doit contenir des titres et des paragraphes.
        Les mots-clés forts doivent être utilisés dans les titres et les paragraphes en gras.
        L'article doit être structuré et facile à lire.
        L'article doit être optimisé pour le référencement naturel.
        Le contenu doit être en français.
        Le contenu doit être original.
        Le contenu doit être au format HTML.
        `,
	};
};
