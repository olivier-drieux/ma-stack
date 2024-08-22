import { getPost } from "@/app/api/getPost";
import EditPostForm from "./EditPostForm";

export default async function EditPostContent({ postId }: { postId: number }) {
	const post = await getPost(postId);

	if (!post.content) {
		throw new Error("Post content not found");
	}

	return <EditPostForm post={post} />;
}
