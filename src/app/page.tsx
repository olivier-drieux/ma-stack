"use client";

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
import { type CreateUser, createUserSchema } from "@/lib/zod/createUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { createUser } from "./api/createUser";

export default function Home() {
	const form = useForm<CreateUser>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const formAction = useAction(createUser, {
		onError: ({ error }) => {
			if (error.validationErrors) {
				for (const [name, message] of Object.entries(error.validationErrors)) {
					form.setError(name as keyof CreateUser, { message: message[0] });
				}
			}
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(formAction.execute)}
				className="flex flex-col gap-4 max-w-md mx-auto bg-black/20 p-4 justify-center min-h-screen"
			>
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
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Email" {...field} />
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
								<Input type="password" placeholder="Password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Confirm Password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
				{formAction.isPending && <p>Loading...</p>}
				{formAction.hasSucceeded && <p>Success!</p>}
				{formAction.hasErrored && <p>Error!</p>}
				<pre>{JSON.stringify(formAction.result, null, 2)}</pre>
			</form>
		</Form>
	);
}
