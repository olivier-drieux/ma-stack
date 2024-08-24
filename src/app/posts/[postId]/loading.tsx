"use client";

import Loader from "@/components/Loader/Loader";
import { useQueryState } from "nuqs";

export default function EditPostLoading() {
	const [isGenerating] = useQueryState("isGenerating");

	return (
		<Loader
			fullScreen
			message={
				isGenerating === null
					? "Fetching post data..."
					: "Post is being generated"
			}
		/>
	);
}
