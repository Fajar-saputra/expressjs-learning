const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000;

app.use(express.json())

const routesAuth = require('./routes/auth.routes')
const routesUser = require("./routes/user.routes");


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api", routesAuth)
app.use("/api", routesUser);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

