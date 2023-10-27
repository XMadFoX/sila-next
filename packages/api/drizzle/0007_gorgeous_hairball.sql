CREATE TABLE `roles` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users_to_roles` (
	`userId` text(255) NOT NULL,
	`roleId` integer NOT NULL,
	PRIMARY KEY(`roleId`, `userId`)
);
--> statement-breakpoint
ALTER TABLE events ADD `country` text(2);--> statement-breakpoint
ALTER TABLE events ADD `city` text(64);--> statement-breakpoint
ALTER TABLE events ADD `address` text(128);--> statement-breakpoint
ALTER TABLE events ADD `map_data` text(64);--> statement-breakpoint
ALTER TABLE events ADD `is_important` integer;--> statement-breakpoint
ALTER TABLE events ADD `status` text(64) DEFAULT 'draft' NOT NULL;