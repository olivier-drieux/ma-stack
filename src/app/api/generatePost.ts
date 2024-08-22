"use server";

import clientAction from "@/lib/clientAction";
import { db } from "@/lib/drizzle/drizzle";
import { posts } from "@/lib/drizzle/schema/post";
import openAi from "@/lib/openAi";
import { generatePostSchema } from "@/lib/zod/generatePostSchema";
import { redirect } from "next/navigation";

export const generatePost = clientAction(generatePostSchema).action(
	async ({ parsedInput: { keyword } }) => {
		const titlePrompt = getPromptForTitle(keyword);
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
			throw new Error("Failed to generate title");
		}

		const contentPrompt = getPromptForContent(keyword, title);
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
			throw new Error("Failed to generate content");
		}

		const newPostId = (
			await db
				.insert(posts)
				.values({ userId: 1, keyword, title, content })
				.$returningId()
		)[0].id;

		redirect(`/posts/${newPostId}`);
	},
);

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
        Tu dois créer un article de blog sur le sujet "${keyword}" dont le titre est "${title}".
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
