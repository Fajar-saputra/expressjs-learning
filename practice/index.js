const express = require("express")
const app = express();

const productRoutes = require("./routes/product.routes")

app.use(express.json())

app.get("/", (req, res) => {
    res.send("apa acep")
})

app.use(productRoutes)

app.listen(3000, () => {
    console.log("Server running at 3000");
    
})
