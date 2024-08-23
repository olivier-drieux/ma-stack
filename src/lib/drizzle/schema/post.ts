import { relations } from "drizzle-orm";
import {
	boolean,
	int,
	mysqlEnum,
	mysqlTable,
	text,
	varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./user";

export const posts = mysqlTable("posts", {
	id: int("id").primaryKey().autoincrement(),
	userId: int("user_id").notNull(),
	wordPressId: int("wordpress_id"),
	keyword: varchar("keyword", { length: 255 }),
	title: text("title"),
	content: text("content"),
	status: mysqlEnum("status", [
		"draft",
		"generating",
		"generated",
		"failed",
		"publish",
		"future",
	])
		.default("draft")
		.notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
	user: one(users, {
		fields: [posts.userId],
		references: [users.id],
	}),
}));

export type Post = typeof posts.$inferSelect;
