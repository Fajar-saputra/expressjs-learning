const errorHandler = (err, req, res, next) => {
    // 1. Tentukan default status code dan message
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    console.error(err.errors);

    // 2. Handling error spesifik dari library JWT
    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Token tidak valid, silakan login ulang.";
    }
    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Sesi Anda telah berakhir, silakan login kembali.";
    }

    // 3. Log ke console untuk kebutuhan debugging developer
    console.error(`[ERROR] ${req.method} ${req.url} ->`, err);

    // 4. Kirim response ke client
    res.status(statusCode).json({
        status: err.status || "error",
        message,
        // Tampilkan stack trace hanya jika bukan di environment production
        ...(process.env.NODE_ENV !== "production" && {
            stack: err.stack?.split("\n").map(e => e.trim())
        })
    });
};

module.exports = { errorHandler };