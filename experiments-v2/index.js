const express = require("express");
const app = express();
const errorMiddleware = require('./middlewares/error.middleware')
const usersRoutes = require("./routes/users.routes")

app.use(express.json())

app.get("/", (req, res) => res.send("belajar lagi"));
app.use(usersRoutes)


// Route 404 (Opsional: untuk menangani URL yang tidak terdaftar)
app.use((req, res, next) => {
    const error = new Error("Halaman tidak ditemukan");
    error.statusCode = 404;
    next(error);
});

// Middleware Error ditaruh PALING BAWAH
app.use(errorMiddleware);

app.listen(3000, () => console.log("server running in 3000"));
