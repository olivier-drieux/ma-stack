"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PostGenerating({ postId }: { postId: number }) {
	const router = useRouter();

	useEffect(() => {
		const checkPostStatus = async () => {
			try {
				const response = await fetch(`/api/posts/${postId}`);
				const data = await response.json();

				if (data.isReadyToEdit) {
					router.refresh();
				}
			} catch (error) {
				console.error("Error checking post status:", error);
			}
		};

		const intervalId = setInterval(checkPostStatus, 5000);

		return () => clearInterval(intervalId);
	}, [postId, router]);

	return (
		<div className="flex flex-col items-center justify-center h-screen gap-2">
			<p className="text-lg font-semibold">Post is being generated</p>
			<Loader2 className="animate-spin w-10 h-10" />
		</div>
	);
}
