class appError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // memberitahu apakah ini error dari system atau gagal input
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        // memberitahu ini error dari kita
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { appError };
