"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

export default function PostGeneratingLoader({ postId }: { postId: number }) {
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

	return <Loader fullScreen message="Post is being generated" />;
}
