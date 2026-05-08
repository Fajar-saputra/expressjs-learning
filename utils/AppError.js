class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        
        // Menandai bahwa ini adalah error yang kita buat sengaja (operational error)
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        // Baris ini sangat penting agar stack trace menunjukkan 
        // lokasi error di controller, bukan di file class ini.
        Error.captureStackTrace(this, this.constructor);
    }
}


module.exports = {AppError}