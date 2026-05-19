const db = require("../../db");
const { business, sale, expense, reminder } = require("../../db/schema");
const { eq } = require("drizzle-orm");

const auth = async (req, res, next) => {
  try {
    const name = req.headers["x-api-key"];
    const api = await db.query.business.findFirst({
      where: (business, { eq }) => eq(business.apiKey, name),
    });
    if (!api) return res.status(401).json({ message: "Unauthorized" });
    req.business = api;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = auth;
