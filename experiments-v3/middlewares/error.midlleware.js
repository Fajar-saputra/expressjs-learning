const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("==========   ERROR DETECTED  ==========");
    console.error(`Time    : ${new Date().toLocaleString()}`);
    console.error(`Path    : ${req.method} ${req.url}`);
    console.error(`Message : ${message}`);
    console.error(`Status  : ${statusCode}`);
    console.error("------------------------------------------");
    console.error(err.stack);
    console.error("==========================================");


    const cleanStack = err.stack.split("\n").map(el => el.trim())
    // 2. Kirim respon ke Postman
    res.status(err.statusCode).json({
        success: "error",
        message: message,
        stack: process.env.NODE_ENV === "development" ? cleanStack : undefined,
    });
};

module.exports = { errorHandler };
