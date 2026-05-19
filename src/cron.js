const db = require("../db");
const { reminder } = require("../db/schema.js");
const { eq, and, lte } = require("drizzle-orm");
const cron = require("node-cron");

cron.schedule("* * * * *", async () => {
  const now = new Date();

  const pending = await db
    .select()
    .from(reminder)
    .where(and(eq(reminder.sent, false), lte(reminder.scheduledAt, now)));
  for (const r of pending) {
    await db.update(reminder).set({ sent: true }).where(eq(reminder.id, r.id));
    console.log(`Reminder sent: ${r.message}`);
  }
});

module.exports = cron;
