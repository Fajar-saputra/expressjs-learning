const express = require("express")
const app = express();

const userRoutes = require('./routers/user.router')
const authRoutes = require('./routers/auth.router')
const productsRoutes = require('./routers/products.routes')
const { errorHandler } = require("./middlewares/error.middleware")
 
app.use(express.json())
app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
  res.send('Server Backend Berhasil Jalan!');
});

app.use('/api', userRoutes)
app.use('/api', authRoutes)
app.use('/api', productsRoutes)
app.use(errorHandler)


app.listen(3000, () => {
    console.log("server runing at 3000")
})
