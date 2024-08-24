"use client";

import { retryGeneratePost } from "@/app/api/generatePost";
import { Button } from "../ui/button";
import { useAction } from "next-safe-action/hooks";
import { Loader2 } from "lucide-react";

export default function PostGenerationFailed({ postId }: { postId: number }) {
	const action = useAction(retryGeneratePost);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold">Post generation failed</h1>
			<Button
				disabled={action.isPending}
				onClick={() => action.execute({ postId })}
			>
				{action.isPending ? (
					<>
						<Loader2 className="mr-2 animate-spin h-4 w-4" /> Retrying...
					</>
				) : (
					"Try again"
				)}
			</Button>
		</div>
	);
}
