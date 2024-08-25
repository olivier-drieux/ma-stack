import PostRow from "@/components/PostRow/PostRow";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Sparkles } from "lucide-react";
import getWpPosts from "../api/getWpPosts";
import Link from "next/link";

export default async function Posts() {
	const wpPosts = await getWpPosts();

	return (
		<div className="min-h-screen w-screen">
			<Button className="ml-auto" asChild>
				<Link href="posts/generate">
					<Sparkles className="mr-2 h-4 w-4" />
					Generate a new post
				</Link>
			</Button>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Linked</TableHead>
						<TableHead className="w-[300px]">Title</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="w-[300px]">Lien</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{wpPosts.map((wpPost) => (
						<PostRow key={wpPost.id} wpPost={wpPost} />
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell>
							{wpPosts.filter((p) => !p.post).length} non-linked posts
						</TableCell>
						<TableCell colSpan={2} />
						<TableCell className="text-right">{wpPosts.length} posts</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}

export const dynamic = "force-dynamic";
