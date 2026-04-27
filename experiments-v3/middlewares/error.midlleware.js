const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.log("=========================================");
    console.log("Name error    : ", err.name);
    console.log("Status error  : ", err.statusCode);
    console.log("Message error : ", err.message);
    
    console.log("=========================================");
    


    res.status(statusCode).json({
        success: 'error',
        message: err.message || "Internal Server Error"
    })
}

module.exports = {errorHandler}