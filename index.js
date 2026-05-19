const { config } = require("dotenv");
config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const salesRoutes = require("./src/routes/sales");
const expensesRoutes = require("./src/routes/expenses");
const summaryRoutes = require("./src/routes/summary");
const reminderRoutes = require("./src/routes/reminder");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api/sales", salesRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/reminder", reminderRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
