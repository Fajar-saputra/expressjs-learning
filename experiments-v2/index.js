const express = require("express");
const app = express();
const errorMiddleware = require('./middlewares/error.middleware')
const usersRoutes = require("./routes/users.routes")
const AppError = require('./utils/AppError')

app.use(express.json())

app.get("/", (req, res) => res.send("belajar lagi"));
app.use(usersRoutes)


// Route 404 (Opsional: untuk menangani URL yang tidak terdaftar)
app.use((req, res, next) => {
    throw new AppError("Halaman tidak ditemukan", 404);
});


// Middleware Error ditaruh PALING BAWAH
app.use(errorMiddleware);

app.listen(3000, () => console.log("server running in 3000"));
