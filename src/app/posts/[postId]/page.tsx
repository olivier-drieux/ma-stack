import EditPostContent from "@/components/EditPostContent/EditPostContent";
import { Suspense } from "react";

export default function EditPost({ params }: { params: { postId: number } }) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<EditPostContent postId={params.postId} />
		</Suspense>
	);
}
