require("dotenv").config();
const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");

// helmet
app.use(helmet());
// cors
const corsOption = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};
app.use(cors(corsOption));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Jangka waktu: 15 menit
    max: 100, // Maksimal 100 request per IP dalam waktu di atas
    message: "Terlalu banyak request dari IP ini, silakan coba lagi nanti setelah 15 menit.",
    standardHeaders: true, // Kembalikan info rate-limit di header `RateLimit-*`
    legacyHeaders: false, // Matikan header `X-RateLimit-*` yang sudah usang
});

// Terapkan ke semua request
app.use(limiter);

// ATAU terapkan spesifik ke rute sensitif saja (misal: Login/Register)
// app.use('/api/auth/login', limiter);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);

module.exports = app;
