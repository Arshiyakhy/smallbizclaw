const { config } = require("dotenv");
config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const salesRoutes = require("./src/routes/sales");
const expensesRoutes = require("./src/routes/expenses");

app.use(express.json());
app.use("/api/sales", salesRoutes);
app.use("/api/expense", expensesRoutes);
app.use(cors());
app.use(helmet());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
