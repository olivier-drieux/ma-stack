"use client";

import type { WpPostWithPost } from "@/app/api/getWpPosts";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "../ui/table";
import LinkWithAppButton from "./LinkWithAppButton";
import Link from "next/link";

export default function PostRow({ wpPost }: { wpPost: WpPostWithPost }) {
	const router = useRouter();

	return (
		<TableRow
			className="cursor-pointer"
			onClick={
				wpPost.post?.id
					? () => router.push(`/posts/${wpPost.post?.id}`)
					: undefined
			}
		>
			<TableCell>
				{wpPost.post?.id ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<Check className="text-green-500" />
						</TooltipTrigger>
						<TooltipContent>Linked with app</TooltipContent>
					</Tooltip>
				) : (
					<HoverCard>
						<HoverCardTrigger asChild>
							<X className="text-red-500" />
						</HoverCardTrigger>
						<HoverCardContent>
							<p>Not linked with app</p>
							<LinkWithAppButton postId={wpPost.id} />
						</HoverCardContent>
					</HoverCard>
				)}
			</TableCell>
			<TableCell className="font-medium">{wpPost.title.rendered}</TableCell>
			<TableCell>{wpPost.status}</TableCell>
			<TableCell>
				<Link
					href={wpPost.link}
					target="_blank"
					rel="noopener noreferrer"
					onClick={(e) => e.stopPropagation()}
				>
					{wpPost.link}
				</Link>
			</TableCell>
		</TableRow>
	);
}
