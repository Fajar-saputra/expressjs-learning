const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

const {errorHandler} = require('./middlewares/error.midlleware')
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const usersRoutes = require("./routes/user.routes");

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use('/api', authRoutes)
app.use("/api", productRoutes);
app.use("/api", usersRoutes);

app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`server running at ${port}`);
});
