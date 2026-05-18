const express = require('express')
require('dotenv').config();
const app = express()
const port = process.env.PORT

app.use(express.json())

const userRoutes = require('./routes/user.routes')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
