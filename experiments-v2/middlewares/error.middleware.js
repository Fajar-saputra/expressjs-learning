const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500

    res.statusCode(statusCode).json({
        success: 'error',
        message: err.message || "Internal Server Error"
    })
}