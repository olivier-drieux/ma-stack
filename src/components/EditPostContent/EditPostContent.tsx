import { getPost } from "@/app/api/getPost";
import EditPostForm from "./EditPostForm";
import PostGenerating from "./PostGenerating";

export default async function EditPostContent({ postId }: { postId: number }) {
	const post = await getPost(postId);

	if (post.status === "generating" || post.status === "failed") {
		return <PostGenerating postId={postId} />;
	}

	return <EditPostForm post={post} />;
}
