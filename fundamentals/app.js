require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

const userRoutes = require("./routes/users.routes");
const authRoutes = require('./routes/auth.routes')
const errorHandler = require("./middlewares/error.middleware");

app.use(userRoutes);
app.use(authRoutes)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`apa runing at ${port}`);
});
