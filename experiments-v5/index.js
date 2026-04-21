const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");

app.use(express.json());

// Routing
app.use("/auth", authRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server running on port 5000");
});