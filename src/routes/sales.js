const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const db = require("../../db");
const { sale } = require("../../db/schema.js");
const { createId } = require("@paralleldrive/cuid2");

router.post("/", auth, async (req, res) => {
  try {
    const { amount, description, date } = req.body;
    const newSale = await db
      .insert(sale)
      .values({
        id: createId(),
        amount,
        description,
        date: date ? new Date(date) : new Date(),
        businessId: req.business.id,
        createdAt: new Date(),
      })
      .returning();
    res.status(201).json(newSale[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/log", auth, async (req, res) => {
  try {
    const { amount, description, date } = req.query;
    const newSale = await db
      .insert(sale)
      .values({
        id: createId(),
        amount,
        description,
        date: date ? new Date(date) : new Date(),
        businessId: req.business.id,
        createdAt: new Date(),
      })
      .returning();
    res.status(201).json(newSale[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
module.exports = router;
