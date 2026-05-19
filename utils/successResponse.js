const successResponse = (res, data = [], message = "Success", status = 200, meta = null) => {
    return res.status(status).json({
        message,
        data,
        ...(meta && { meta }),
    });
};

module.exports = {successResponse}