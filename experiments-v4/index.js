const express = require("express");
const app = express();

const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


const testRoutes = require("./test.router");
const productsRoutes = require("./products.router");

app.use("/api", testRoutes);
app.use("/api", productsRoutes);

app.listen(PORT, () => {
    console.log("server runing");
});
