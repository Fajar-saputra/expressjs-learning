const successResponse = (res, data, message = "OK", statusCode = 200, meta = null) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        ...(meta && { meta }),
    });
};
const errorResponse = (res, data, message = "Fails", statusCode = 400, meta = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        data,
        ...(meta && { meta }),
    });
};

module.exports = {successResponse, errorResponse}
