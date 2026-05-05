const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const cleanStack = err.stack.split("\n").map((m) => m.trim());

    // Debugging: Lihat objek asli di terminal
    console.log("=== ERROR LOG ===");
    console.error("Name:", err.name);
    console.error("Message:", message);
    console.error("Status Code:", statusCode);
    console.error("Stack", cleanStack);

    console.log("=================");

    res.status(statusCode).json({
        success: "error",
        message,
    });
};

module.exports = { errorHandler };
