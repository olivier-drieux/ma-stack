"use client";

import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SignInForm({ csrfToken }: { csrfToken: string }) {
	const form = useForm({
		defaultValues: {
			csrfToken,
			username: "",
			password: "",
		},
		resolver: zodResolver(
			z.object({
				csrfToken: z.string().min(1),
				username: z.string().min(1, "Username is required"),
				password: z.string().min(1, "Password is required"),
			}),
		),
	});

	return (
		<Form {...form}>
			<form
				className="flex flex-col space-y-4"
				onSubmit={(event) => {
					form.handleSubmit(async (data) => {
						// TODO: server action that
						const a = await fetch("/api/auth/callback/credentials", {
							method: "POST",
							body: JSON.stringify(data),
						});

						console.log(a);
					})(event);
				}}
			>
				<input name="csrfToken" type="hidden" />
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="Username" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="Password" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Sign in</Button>
			</form>
		</Form>
	);
}
