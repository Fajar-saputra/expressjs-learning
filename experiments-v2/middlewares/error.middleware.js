const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    console.log("==============================================");
    console.log("Nama    error : ", err.name);
    console.log("message error : ", err.message);
    console.log("status  error : ", err.statusCode);
    console.log("==============================================");

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    });
};

module.exports = { errorHandler };
