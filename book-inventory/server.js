const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", bookRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
