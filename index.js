const express = require("express");
const app = express();
require("dotenv").config();
const { errorHandler } = require("./middlewares/error.middleware");

app.use(express.json());

const produtsRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");

// Routing
app.use("/api", produtsRoutes);
app.use("/api", authRoutes);

app.use(errorHandler);

// Start server
app.listen(process.env.PORT, () => {
    console.log("Server running on port 5000");
});