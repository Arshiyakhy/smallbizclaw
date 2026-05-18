const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const db = require("../../db");
const { sale, expense } = require("../../db/schema.js");
const { eq, and, sum, gte, lte } = require("drizzle-orm");

router.get("/", auth, async (req, res) => {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date();
  end.setUTCHours(23, 59, 59, 999);
  const totalSales = await db
    .select({ total: sum(sale.amount) })
    .from(sale)
    .where(
      and(
        eq(sale.businessId, req.business.id),
        gte(sale.date, start),
        lte(sale.date, end),
      ),
    );
  const totalExpenses = await db
    .select({ total: sum(expense.amount) })
    .from(expense)
    .where(
      and(
        eq(expense.businessId, req.business.id),
        gte(expense.date, start),
        lte(expense.date, end),
      ),
    );
  res.json({
    totalSales: totalSales[0].total,
    totalExpenses: totalExpenses[0].total,
  });
});

module.exports = router;
