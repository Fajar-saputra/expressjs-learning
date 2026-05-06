class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4")?'fail': 'error'
        this.isOperational = true; // ini eror yang saya buat sendiri
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = {AppError}