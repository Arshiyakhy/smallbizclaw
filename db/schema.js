const { unique } = require("drizzle-orm/gel-core");
const {
  varchar,
  integer,
  serial,
  text,
  boolean,
  pgTable,
  numeric,
  timestamp,
} = require("drizzle-orm/pg-core");
const business = pgTable("business", {
  id: text().primaryKey(),
  name: text().notNull(),
  phone: text().notNull().unique(),
  apiKey: text().notNull().unique(),
  createdAt: timestamp().defaultNow().notNull(),
});
const sale = pgTable("sale", {
  id: text().primaryKey(),
  createdAt: timestamp().defaultNow().notNull(),
  amount: numeric().notNull(),
  description: text().notNull(),
  date: timestamp().defaultNow().notNull(),
  businessId: text().notNull(),
});
const expense = pgTable("expense", {
  id: text().primaryKey(),
  createdAt: timestamp().defaultNow().notNull(),
  amount: numeric().notNull(),
  description: text().notNull(),
  date: timestamp().defaultNow().notNull(),
  businessId: text().notNull(),
});
const reminder = pgTable("reminder", {
  id: text().primaryKey(),
  businessId: text().notNull(),
  message: text().notNull(),
  scheduledAt: timestamp().notNull(),
  sent: boolean().notNull().default(false),
});
module.exports = { business, reminder, sale, expense };
