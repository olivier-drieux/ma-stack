import { getPost } from "@/app/api/getPost";
import EditPostForm from "@/components/EditPostForm/EditPostForm";
import PostGeneratingLoader from "@/components/PostGeneratingLoader/PostGeneratingLoader";
import PostGenerationFailed from "@/components/PostGenerationFailed/PostGenerationFailed";

export default async function EditPost({
	params,
}: { params: { postId: string } }) {
	const post = await getPost(+params.postId);

	if (post.status === "failed") {
		return <PostGenerationFailed postId={+params.postId} />;
	}

	if (post.status === "in_queue" || post.status === "generating") {
		return <PostGeneratingLoader postId={+params.postId} />;
	}

	return (
		<EditPostForm
			postId={+params.postId}
			title={post.title}
			content={post.content}
			wordPressId={post.wordPressId}
		/>
	);
}
