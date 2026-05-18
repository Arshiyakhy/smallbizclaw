const { drizzle } = require("drizzle-orm/node-postgres");
const schema = require("./schema");

const db = drizzle(process.env.DATABASE_URL, { schema });
module.exports = db;
