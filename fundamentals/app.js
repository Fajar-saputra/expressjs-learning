require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT;

const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes");
const errorHandler = require("./middlewares/error.middleware");

app.use(userRoutes);
app.use(profileRoutes);
app.use(errorHandler);

app.listen(port, (req, res) => {
    console.log(`apa runing at ${port}`);
});
