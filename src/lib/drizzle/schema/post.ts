import {
	mysqlTable,
	varchar,
	int,
	timestamp,
	text,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { users } from "./user";

export const posts = mysqlTable("posts", {
	id: int("id").primaryKey().autoincrement(),
	title: varchar("title", { length: 255 }).notNull(),
	content: text("content"),
	userId: int("user_id").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const postsRelations = relations(posts, ({ one }) => ({
	user: one(users, {
		fields: [posts.userId],
		references: [users.id],
	}),
}));
