ALTER TABLE base_content ADD `status` text(64) DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `status`;