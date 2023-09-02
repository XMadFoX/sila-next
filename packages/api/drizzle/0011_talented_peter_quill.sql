CREATE TABLE `project_types` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cooperation` (
	`id` integer PRIMARY KEY NOT NULL,
	`base_id` integer NOT NULL,
	`timestamp` integer NOT NULL,
	`is_online` integer NOT NULL,
	`country` text(2),
	`city` text(64),
	`address` text(128),
	`cover_image` text(255) NOT NULL,
	`description` text(255) NOT NULL,
	`map_data` text(64),
	`is_important` integer,
	`entry_type` text NOT NULL,
	`project_topic_id` integer,
	FOREIGN KEY (`project_topic_id`) REFERENCES `project_types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `id` ON `project_types` (`id`);--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `duration`;