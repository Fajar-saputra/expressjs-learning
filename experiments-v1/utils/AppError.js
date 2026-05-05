class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        // Menentukan status berdasarkan statusCode (misal: 404 -> fail, 500 -> error)
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

        // Menandai bahwa ini adalah error yang kita buat sendiri (bukan bug sistem/library)
        this.isOperational = true;

        // Menghapus constructor AppError dari stack trace agar lebih bersih
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {AppError};
