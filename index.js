const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsRoutes = require("./routes/products.router");
const authRoutes = require('./routes/auth.router')

app.use("/api", productsRoutes);
app.use('/api', authRoutes)
app.use((req, res) => {
  res.status(404).send("Maaf, halaman tidak ditemukan");
});

app.listen(port, () => {
    console.log(`server runing port ${port}`);
});
