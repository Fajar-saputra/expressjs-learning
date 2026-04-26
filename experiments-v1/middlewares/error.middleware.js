const errorHandler = (err, req, res, next) => {

        // Debugging: Lihat objek asli di terminal
    console.log("=== ERROR LOG ===");
    console.error("Name:", err.name);
    console.error("Message:", err.message);
    console.error("Status Code:", err.statusCode);
    console.log("=================");

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: 'error',
        message: err.message || "Internal Server Error"
    })
}

module.exports = {errorHandler};
