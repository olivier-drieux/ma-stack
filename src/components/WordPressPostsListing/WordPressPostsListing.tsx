import getWpPosts from "@/app/api/getWpPosts";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import PostRow from "./PostRow";

export default async function WordPressPostsListing() {
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
				<TableCaption>A list of your recent invoices.</TableCaption>
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
						<TableCell colSpan={3}>Total</TableCell>
						<TableCell className="text-right">$2,500.00</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
