import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar, tinyint, timestamp, index, foreignKey, text, date, mysqlEnum, mediumint, datetime, double } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const campaignTypes = mysqlTable("campaign_types", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 100 }),
	isActive: tinyint("isActive"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		campaignTypesId: primaryKey({ columns: [table.id], name: "campaign_types_id"}),
	}
});

export const campaigns = mysqlTable("campaigns", {
	id: int("id").autoincrement().notNull(),
	title: varchar("title", { length: 500 }).notNull(),
	description: text("description"),
	fundraiserId: int("fundraiser_id").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	startDate: date("start_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	endDate: date("end_date", { mode: 'string' }),
	goal: int("goal"),
	fundsRaised: int("funds_raised"),
	status: mysqlEnum("status", ['active','expired','completed','canceled']),
	campaignImage: varchar("campaign_image", { length: 800 }),
	paybillNumber: mediumint("paybill_number"),
	privacySetting: mysqlEnum("privacy_setting", ['public','private']),
	verificationStatus: tinyint("verification_status"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	createdAt: date("created_at", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	updatedAt: date("updated_at", { mode: 'string' }),
	metricId: int("metric_id").notNull().references(() => metrics.id),
	campaignTypeId: int("campaign_type_id").notNull().references(() => campaignTypes.id),
},
(table) => {
	return {
		campaignTypeId: index("campaign_type_id").on(table.campaignTypeId),
		metricId: index("metric_id").on(table.metricId),
		campaignsId: primaryKey({ columns: [table.id], name: "campaigns_id"}),
	}
});

export const campaignsToCategories = mysqlTable("campaigns_to_categories", {
	campaignId: int("campaign_id").notNull().references(() => campaigns.id),
	categoryId: int("category_id").notNull().references(() => categories.id),
},
(table) => {
	return {
		categoryId: index("category_id").on(table.categoryId),
		campaignsToCategoriesCampaignIdCategoryId: primaryKey({ columns: [table.campaignId, table.categoryId], name: "campaigns_to_categories_campaign_id_category_id"}),
	}
});

export const categories = mysqlTable("categories", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 100 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		categoriesId: primaryKey({ columns: [table.id], name: "categories_id"}),
	}
});

export const donationHistories = mysqlTable("donation_histories", {
	id: int("id").autoincrement().notNull(),
	donorId: int("donor_id").notNull().references(() => donors.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		donorId: index("donor_id").on(table.donorId),
		donationHistoriesId: primaryKey({ columns: [table.id], name: "donation_histories_id"}),
	}
});

export const donations = mysqlTable("donations", {
	id: int("id").autoincrement().notNull(),
	campaignId: int("campaign_id").notNull().references(() => campaigns.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	donationHistoryId: int("donation_history_id").notNull().references(() => donationHistories.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	donationDate: date("donation_date", { mode: 'string' }),
	amount: mediumint("amount"),
},
(table) => {
	return {
		donationHistoryId: index("donation_history_id").on(table.donationHistoryId),
		campaignId: index("campaign_id").on(table.campaignId),
		donationsId: primaryKey({ columns: [table.id], name: "donations_id"}),
	}
});

export const donors = mysqlTable("donors", {
	id: int("id").autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: datetime("updated_at", { mode: 'string'}),
},
(table) => {
	return {
		userId: index("user_id").on(table.userId),
		donorsId: primaryKey({ columns: [table.id], name: "donors_id"}),
	}
});

export const fundraisers = mysqlTable("fundraisers", {
	id: int("id").autoincrement().notNull(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	profilePicture: varchar("profile_picture", { length: 1000 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dob: date("dob", { mode: 'string' }).notNull(),
	idNumber: mediumint("id_number"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		userId: index("user_id").on(table.userId),
		fundraisersId: primaryKey({ columns: [table.id], name: "fundraisers_id"}),
	}
});

export const metrics = mysqlTable("metrics", {
	id: int("id").autoincrement().notNull(),
	donorCount: mediumint("donor_count"),
	totalFundsRaised: mediumint("total_funds_raised"),
	maxDonation: mediumint("max_donation"),
	minDonation: mediumint("min_donation"),
	donationFrequency: mediumint("donation_frequency"),
	progress: double("progress"),
},
(table) => {
	return {
		metricsId: primaryKey({ columns: [table.id], name: "metrics_id"}),
	}
});

export const users = mysqlTable("users", {
	id: int("id").autoincrement().notNull(),
	firstName: varchar("first_name", { length: 200 }).notNull(),
	lastName: varchar("last_name", { length: 200 }).notNull(),
	userName: varchar("user_name", { length: 200 }).notNull(),
	password: varchar("password", { length: 300 }).notNull(),
	email: varchar("email", { length: 300 }).notNull(),
	address: varchar("address", { length: 300 }),
},
(table) => {
	return {
		usersId: primaryKey({ columns: [table.id], name: "users_id"}),
	}
});