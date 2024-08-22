"use client";

import { generatePost } from "@/app/api/generatePost";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { generatePostSchema } from "@/lib/zod/generatePostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

export default function GeneratePost() {
	const form = useForm({
		resolver: zodResolver(generatePostSchema),
		defaultValues: {
			keyword: "",
		},
	});

	const { toast } = useToast();

	const action = useAction(generatePost, {
		onError: () => {
			toast({
				title: "Error",
				description:
					"An error occurred while generating the post. Please try again.",
				variant: "destructive",
			});
		},
	});

	return (
		<div className="min-h-screen w-screen flex justify-center items-center">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(action.execute)}>
					<FormField
						control={form.control}
						name="keyword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Post keyword</FormLabel>
								<FormControl>
									<Input placeholder="Post keyword" {...field} />
								</FormControl>
								<FormDescription>
									Enter a keyword to generate a post about it.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={action.isPending}>
						{action.isPending && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						Generate
					</Button>
				</form>
			</Form>
		</div>
	);
}
