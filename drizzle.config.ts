import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

if (!process.env.DATABASE_URL) {
	loadEnvConfig(process.cwd());

	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL is not set");
	}
}

export default defineConfig({
	schema: "./src/lib/drizzle/schema/*",
	out: "./drizzle",
	dialect: "mysql",
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
});
