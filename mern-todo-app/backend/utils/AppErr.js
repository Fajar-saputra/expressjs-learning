class AppErr extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Untuk membedakan error sistem vs error buatan kita

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppErr;