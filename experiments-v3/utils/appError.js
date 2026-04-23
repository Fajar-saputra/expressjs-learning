// versi pro dikit
// class AppError extends Error {
//     constructor(message, statusCode) {
//         super(message)
//         this.statusCode = statusCode;
//         this.isOperational = true;
//         Error.captureStackTrace(this, this.constructor);
//     }
// }

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = { AppError };
