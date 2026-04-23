const errorRespon = (res, message = "Error", statusCode = 400, data = null, meta = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        ...(data && { data }), 
        ...(meta && { meta }),
    });
};

const successRespon = (res, data, message = "OK", statusCode = 200, meta = null) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        ...(meta && { meta }),
    });
};

module.exports = {errorRespon, successRespon}
