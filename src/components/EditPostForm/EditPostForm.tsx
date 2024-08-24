"use client";

import { savePost } from "@/app/api/savePost";
import TextEditor from "@/components/TextEditor/TextEditor";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editPostSchema } from "@/lib/zod/editPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";

interface EditPostFormProps {
	postId: number;
	title: string | null;
	content: string | null;
	wordPressId: number | null;
}

export default function EditPostForm({
	postId,
	title,
	content,
	wordPressId,
}: EditPostFormProps) {
	const form = useForm({
		resolver: zodResolver(editPostSchema),
		defaultValues: {
			title: title ?? "",
			content: content ?? "",
		},
	});

	const { toast } = useToast();

	const action = useAction(savePost, {
		onError: () => {
			toast({
				title: "Error",
				description:
					"An error occurred while saving the post, please try again.",
				variant: "destructive",
			});
		},
	});

	return (
		<Form {...form}>
			<div className="min-h-screen w-screen max-w-xl mx-auto flex flex-col gap-4">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Post title</FormLabel>
							<FormControl>
								<Input placeholder="Post title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Post content</FormLabel>
							<FormControl>
								<TextEditor {...field} className="h-[500px]" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="button"
					disabled={action.isPending}
					onClick={form.handleSubmit((data) =>
						action.execute({ ...data, postId }),
					)}
				>
					{action.isPending && (
						<Loader2 className="w-4 h-4 mr-2 animate-spin" />
					)}
					Save
				</Button>
				{!wordPressId && (
					<Button
						type="button"
						disabled={action.isPending}
						onClick={form.handleSubmit((data) =>
							action.execute({ ...data, postId, publish: true }),
						)}
					>
						{action.isPending && (
							<Loader2 className="w-4 h-4 mr-2 animate-spin" />
						)}
						Publish
					</Button>
				)}
			</div>
		</Form>
	);
}
