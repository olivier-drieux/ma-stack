import WordPressPostsListing from "@/components/WordPressPostsListing/WordPressPostsListing";
import { Suspense } from "react";

export default function Posts() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<WordPressPostsListing />
		</Suspense>
	);
}
