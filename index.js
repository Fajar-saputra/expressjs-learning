const express = require('express')
require('dotenv').config();
const app = express()
const port = process.env.PORT

app.use(express.json())

const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
const prodcutRoutes = require('./routes/product.routes')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', prodcutRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
