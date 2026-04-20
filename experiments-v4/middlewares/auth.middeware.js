const { JsonWebTokenError } = require("jsonwebtoken");
const { AppError } = require("../utils/AppError");
const { asycnHandler } = require("../utils/asyncHandler");

const protect = asycnHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new AppError("Anda belum login, silahkan login dahulu!");
    }

    try {
        // verifikasi token
        const decoded = JsonWebTokenError.verify(token, process.env)
    } catch (error) {
        
    }
})