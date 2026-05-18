const db = require("../../db");
const { business, sale, expense, reminder } = require("../../db/schema");
const { eq } = require("drizzle-orm");

const auth = async (req, res, next) => {
  const name = req.headers["x-api-key"];
  const api = await db.query.business.findFirst({
    where: (business, { eq }) => eq(business.apiKey, name),
  });
  if (!api) return res.status(401).json({ message: "Unauthorized" });
  req.business = api;
  next();
};
module.exports = auth;
