import { db } from "@/lib/drizzle/drizzle";
import { users } from "@/lib/drizzle/schema/user";
import { and, eq } from "drizzle-orm";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "john_doe",
					value: "john_doe",
				},
				password: { label: "Password", type: "password", value: "password" },
			},
			authorize: async (credentials) => {
				if (!credentials?.username || !credentials?.password) {
					return null;
				}

				const user = (
					await db
						.select()
						.from(users)
						.where(
							and(
								eq(users.username, credentials.username),
								eq(users.password, credentials.password),
							),
						)
				)[0];

				if (!user) {
					return null;
				}

				return {
					id: user.id.toString(),
					name: user.username,
					email: user.email,
				};
			},
		}),
	],
});

export { handler as GET, handler as POST };
