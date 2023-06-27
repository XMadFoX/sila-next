ALTER TABLE `users` RENAME COLUMN `emailVerified` TO `email_verified`;--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `totpSecret` TO `totp_secret`;--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `totpEnabled` TO `totp_enabled`;--> statement-breakpoint
/*
 SQLite does not support "Set autoincrement to a column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/