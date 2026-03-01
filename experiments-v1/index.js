const express = require("express")
const app = express();

const userRoutes = require('./routers/user.router')

app.use(express.json())

app.use(userRoutes)


app.listen(3000, () => {
    console.log("server runing at 3000")
})