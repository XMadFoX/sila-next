CREATE TABLE `article_texts` (
	`id` integer PRIMARY KEY NOT NULL,
	`article_id` integer,
	`text` json NOT NULL
);
--> statement-breakpoint
CREATE TABLE `event_types` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY NOT NULL,
	`base_id` integer NOT NULL,
	`timestamp` integer NOT NULL,
	`duration` integer,
	`is_online` integer,
	`is_free` integer,
	`cover_image` text(255) NOT NULL,
	`description` text(255) NOT NULL,
	`registration_url` text(255),
	`event_type_id` integer
);
--> statement-breakpoint
CREATE TABLE `base_content` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text(64) NOT NULL,
	`published_at` integer NOT NULL,
	`author_id` text NOT NULL
);
--> statement-breakpoint
/*
 SQLite does not support "Set default to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
CREATE UNIQUE INDEX `id` ON `event_types` (`id`);