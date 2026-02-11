const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT

const { protect } = require('./middlewares/auth.middleware');
const authRoutes = require('./routes/auth.routes');
const todoRoutes = require('./routes/todo.routes')

app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello pemula")
})


// app.use('/api', authRoutes);
// Sekarang rute todo kita lindungi dengan middleware protect
// app.use('/api', protect, todoRoutes);

app.listen(port, console.log("server runing")
)