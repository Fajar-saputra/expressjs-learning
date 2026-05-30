const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const { errorHandler } = require("./middleware/error.middleware");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);

app.use(errorHandler);

module.exports = app;
