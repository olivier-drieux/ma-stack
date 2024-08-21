ALTER TABLE `posts` ADD `wordpress_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` DROP COLUMN `title`;--> statement-breakpoint
ALTER TABLE `posts` DROP COLUMN `content`;--> statement-breakpoint
ALTER TABLE `posts` DROP COLUMN `created_at`;--> statement-breakpoint
ALTER TABLE `posts` DROP COLUMN `updated_at`;