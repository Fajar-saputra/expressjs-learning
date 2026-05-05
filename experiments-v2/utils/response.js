const successResponse = (res, data = null, message = "OK", statusCode = 200, meta = null) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        ...(meta != null && { meta }),
    });
};
const errorResponse = (res, data = null, message = "Error", statusCode = 400, meta = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        data,
        ...(meta != null && { meta }),
    });
};

module.exports = { successResponse, errorResponse };
