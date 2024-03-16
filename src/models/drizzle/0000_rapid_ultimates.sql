-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `campaign_types` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`isActive` tinyint,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp,
	CONSTRAINT `campaign_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `campaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`description` text,
	`fundraiser_id` int NOT NULL,
	`start_date` date,
	`end_date` date,
	`goal` int,
	`funds_raised` int,
	`status` enum('active','expired','completed','canceled'),
	`campaign_image` varchar(800),
	`paybill_number` mediumint,
	`privacy_setting` enum('public','private'),
	`verification_status` tinyint,
	`created_at` date,
	`updated_at` date,
	`metric_id` int NOT NULL,
	`campaign_type_id` int NOT NULL,
	CONSTRAINT `campaigns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `campaigns_to_categories` (
	`campaign_id` int NOT NULL,
	`category_id` int NOT NULL,
	CONSTRAINT `campaigns_to_categories_campaign_id_category_id` PRIMARY KEY(`campaign_id`,`category_id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `donation_histories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`donor_id` int NOT NULL,
	CONSTRAINT `donation_histories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `donations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`campaign_id` int NOT NULL,
	`donation_history_id` int NOT NULL,
	`donation_date` date,
	`amount` mediumint,
	CONSTRAINT `donations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `donors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime,
	CONSTRAINT `donors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fundraisers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`profile_picture` varchar(1000),
	`dob` date NOT NULL,
	`id_number` mediumint,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `fundraisers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`donor_count` mediumint,
	`total_funds_raised` mediumint,
	`max_donation` mediumint,
	`min_donation` mediumint,
	`donation_frequency` mediumint,
	`progress` double,
	CONSTRAINT `metrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(200) NOT NULL,
	`last_name` varchar(200) NOT NULL,
	`user_name` varchar(200) NOT NULL,
	`password` varchar(300) NOT NULL,
	`email` varchar(300) NOT NULL,
	`address` varchar(300),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `campaign_type_id` ON `campaigns` (`campaign_type_id`);--> statement-breakpoint
CREATE INDEX `metric_id` ON `campaigns` (`metric_id`);--> statement-breakpoint
CREATE INDEX `category_id` ON `campaigns_to_categories` (`category_id`);--> statement-breakpoint
CREATE INDEX `donor_id` ON `donation_histories` (`donor_id`);--> statement-breakpoint
CREATE INDEX `donation_history_id` ON `donations` (`donation_history_id`);--> statement-breakpoint
CREATE INDEX `campaign_id` ON `donations` (`campaign_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `donors` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `fundraisers` (`user_id`);--> statement-breakpoint
ALTER TABLE `campaigns` ADD CONSTRAINT `campaigns_ibfk_1` FOREIGN KEY (`campaign_type_id`) REFERENCES `campaign_types`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `campaigns` ADD CONSTRAINT `campaigns_ibfk_2` FOREIGN KEY (`metric_id`) REFERENCES `metrics`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `campaigns_to_categories` ADD CONSTRAINT `campaigns_to_categories_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `campaigns_to_categories` ADD CONSTRAINT `campaigns_to_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `donation_histories` ADD CONSTRAINT `donation_histories_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `donors`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `donations` ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`donation_history_id`) REFERENCES `donation_histories`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `donations` ADD CONSTRAINT `donations_ibfk_2` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `donors` ADD CONSTRAINT `donors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `fundraisers` ADD CONSTRAINT `fundraisers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;
*/