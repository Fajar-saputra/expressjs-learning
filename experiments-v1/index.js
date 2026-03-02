const express = require("express")
const app = express();

const userRoutes = require('./routers/user.router')
const authRoutes = require('./routers/auth.router')
const handleError = require("./middlewares/error.middleware")
 
app.use(express.json())

app.use(userRoutes)
app.use(authRoutes)
app.use(handleError)


app.listen(3000, () => {
    console.log("server runing at 3000")
})