const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

const {errorHandler} = require('./middlewares/error.midlleware')
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

app.use(express.json());

app.use('/api', authRoutes)
app.use("/api", productRoutes);

app.use(errorHandler)

app.listen(port, () => {
    console.log(`server running at ${port}`);
});
