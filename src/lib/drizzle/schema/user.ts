import { mysqlTable, varchar, int, timestamp } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { posts } from "./post";

export const users = mysqlTable("users", {
	id: int("id").primaryKey().autoincrement(),
	username: varchar("username", { length: 255 }).notNull().unique(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	password: varchar("password", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
}));
