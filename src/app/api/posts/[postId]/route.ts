import { getPost } from "@/app/api/getPost";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

console.log("test");
export async function GET(
	_: Request,
	{ params }: { params: { postId: number } },
) {
	const post = await getPost(params.postId);

	if (!post) {
		notFound();
	}

	return NextResponse.json({
		isReadyToEdit: post.status !== "generating" && post.status !== "failed",
	});
}
