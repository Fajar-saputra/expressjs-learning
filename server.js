const express = require("express")
require('dotenv').config();

const port = process.env.PORT;

const app = express()


app.get("/", (req, res) => {
    res.send("Hello word")
})

app.listen(port, () => {
    console.log("Server runing at ", port);
    
})

app.put('/user', () => {
    res.send("got a put at /user")
})