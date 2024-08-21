import getWpPosts from "@/app/api/getWpPosts";
import {
	TableCaption,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	TableFooter,
	Table,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { HoverCardTrigger } from "../ui/hover-card";

export default async function WordPressPostsListing() {
	const wpPosts = await getWpPosts();

	return (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead />
					<TableHead className="w-[100px]">Title</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Lien</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{wpPosts.map((wpPost) => (
					<TableRow key={wpPost.id}>
						<TableCell>
							{wpPost.post?.id ? (
								<Tooltip>
									<TooltipTrigger asChild>
										<Check className="text-green-50" />
									</TooltipTrigger>
									<TooltipContent>Linked with app</TooltipContent>
								</Tooltip>
							) : (
								<HoverCard>
									<HoverCardTrigger asChild>
										<X className="text-red-500" />
									</HoverCardTrigger>
									<TooltipContent>Not linked with app</TooltipContent>
								</HoverCard>
							)}
						</TableCell>
						<TableCell className="font-medium">
							{wpPost.title.rendered}
						</TableCell>
						<TableCell>{wpPost.status}</TableCell>
						<TableCell>{wpPost.link}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$2,500.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
