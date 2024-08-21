import { relations } from "drizzle-orm";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { users } from "./user";

export const posts = mysqlTable("posts", {
	id: int("id").primaryKey().autoincrement(),
	userId: int("user_id").notNull(),
	wordPressId: int("wordpress_id").notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
	user: one(users, {
		fields: [posts.userId],
		references: [users.id],
	}),
}));
