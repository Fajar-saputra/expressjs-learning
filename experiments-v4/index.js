const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsRoutes = require("./routes/products.router");

app.use("/api", productsRoutes);

app.listen(port, () => {
    console.log(`server runing port ${port}`);
});
