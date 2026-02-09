const express = require("express");
const cors = require('cors');
const todoRoutes = require("./todo.routes");
require("dotenv").config();
const globalErrorHandler = require('./middleware/globalErrorHandler')

const app = express();
app.use(cors());
app.use(express.json());

// Gunakan routes yang sudah dipisah
app.use("/api/todos", todoRoutes);

app.use("/api", (req, res) => {
    res.status(200).json({
        success: true,
        message: "testing aja"
    })
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
