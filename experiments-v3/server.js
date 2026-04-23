const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

const { protect } = require("./middlewares/auth.middleware");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

app.use(express.json());

app.use("/api", productRoutes);

app.listen(port, () => {
    console.log(`server running at ${port}`);
});
