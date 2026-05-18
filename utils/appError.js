class appError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Menandakan bahwa ini adalah error yang kita buat sengaja (prediktabil)

        // Menyembunyikan fungsi constructor ini dari stack trace agar log lebih bersih
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { appError };