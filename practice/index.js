require("dotenv").config();
const express = require("express")
const app = express();

const productRoutes = require("./routes/product.routes")
const userRoutes = require("./routes/users.routes")
const errorHandler = require("./middleware/error.middleware")

app.use(express.json())

app.get("/", (req, res) => {
    res.send("apa acep")
})

app.use(productRoutes)
app.use(userRoutes)

app.use(errorHandler)

app.listen(3000, () => {
    console.log("Server running at 3000");
    
})
