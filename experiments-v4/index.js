const express = require("express");
const app = express();

const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


const productsRoutes = require("./routes/products.router");


app.use("/api", productsRoutes);

app.listen(PORT, () => {
    console.log("server runing");
});
