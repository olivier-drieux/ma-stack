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
		<div className="flex flex-col space-y-4">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-8">Linked</TableHead>
						<TableHead className="min-w-[200px]">Title</TableHead>
						<TableHead className="w-10">Status</TableHead>
						<TableHead className="min-w-[300px]">Link</TableHead>
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
							<Button asChild>
								<Link href="posts/generate">
									<Sparkles className="mr-2 h-4 w-4" />
									Generate a new post
								</Link>
							</Button>
						</TableCell>
						<TableCell colSpan={3}>
							<div className="text-right">
								<p>{wpPosts.filter((p) => !p.post).length} non-linked posts</p>
								<p>{wpPosts.length} posts</p>
							</div>
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}

export const dynamic = "force-dynamic";
