/**
 * Middleware untuk menangani error secara terpusat.
 *
 * @param {Object} err - Objek error yang dikirim dari middleware sebelumnya.
 * @param {number} [err.statusCode] - Kode status HTTP (opsional, default 500).
 * @param {string} [err.message] - Pesan error (opsional, default Internal Server Error).
 * @param {import('express').Request} req - Objek Request Express.
 * @param {import('express').Response} res - Objek Response Express.
 * @param {import('express').NextFunction} next - Fungsi Next Express.
 */

const errorHandler = (err, req, res, next) => {
    const cleanStack = err.stack.split("\n").map((m) => m.trim());
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.log("=============================================");
    console.log("Message     : ", message);
    console.log("statusCode  : ", statusCode);
    console.log("cleanStack  : ", cleanStack);
    console.log("=============================================");

    res.status(statusCode).json({
        success: "error",
        message: message,
        stack: process.env.NODE_DEV === "development" ? cleanStack : undefined,
    });
};

module.exports = { errorHandler };
