const successResponse = (res, data, message = "OK", statusCode = 200, meta = null) => {
    return res.status(statusCode).json({
        succces: true,
        message,
        data,
        ...(meta && {meta})
    })
}

const errorResponse = (res, data, message = "Error", statusCode = 400, meta = null) => {
    return res.status(statusCode).json({
        succces: true,
        message,
        data,
        ...(data && meta),
        ...(meta && {meta})
    })
}

module.exports = {successResponse, errorResponse}