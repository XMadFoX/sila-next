CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` varchar(128) NOT NULL,
	`name` varchar(32) NOT NULL,
	`password` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`avatar` varchar(255),
	`organization` int);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `users` (`email`);