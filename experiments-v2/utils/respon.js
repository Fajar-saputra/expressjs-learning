const successRespon = (res, data = null, message = "OK", statusCode = 200, meta = null) =>{
    return res.status(statusCode).json({
        succcess: true,
        message,
        data,
        ...(data && { meta }),
        ...(meta && {meta})
    })
}
const errorRespon = (res, data = null, message = "Error", statusCode = 400, meta = null) =>{
    return res.status(statusCode).json({
        succcess: false,
        message,
        data,
        ...(data && { meta }),
        ...(meta && {meta})
    })
}

module.exports = {successRespon, errorRespon}