CREATE TABLE "business" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"apiKey" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "business_phone_unique" UNIQUE("phone"),
	CONSTRAINT "business_apiKey_unique" UNIQUE("apiKey")
);
--> statement-breakpoint
CREATE TABLE "reminder" (
	"id" text PRIMARY KEY NOT NULL,
	"businessId" text NOT NULL,
	"message" text NOT NULL,
	"scheduledAt" timestamp NOT NULL,
	"sent" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sale" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"amount" numeric NOT NULL,
	"description" text NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"businessId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expense" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"amount" numeric NOT NULL,
	"description" text NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"businessId" text NOT NULL
);
