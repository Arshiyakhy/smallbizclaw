const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const db = require("../../db");
const { reminder } = require("../../db/schema.js");
const { createId } = require("@paralleldrive/cuid2");
const { eq, and, lte } = require("drizzle-orm");

router.post("/", auth, async (req, res) => {
  try {
    const { message, scheduledAt } = req.body;
    const newReminder = await db
      .insert(reminder)
      .values({
        id: createId(),
        message,
        scheduledAt: new Date(scheduledAt),
        businessId: req.business.id,
        createdAt: new Date(),
        sent: false,
      })
      .returning();
    res.status(201).json(newReminder[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/pending", auth, async (req, res) => {
  try {
    const now = new Date();
    const pendingReminders = await db
      .select()
      .from(reminder)
      .where(
        and(
          eq(reminder.businessId, req.business.id),
          eq(reminder.sent, false),
          lte(reminder.scheduledAt, now),
        ),
      );
    res.json(pendingReminders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
