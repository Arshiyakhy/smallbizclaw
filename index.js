const { config } = require("dotenv");
config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const salesRoutes = require("./src/routes/sales");

app.use(express.json());
app.use("/api/sales", salesRoutes);
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
