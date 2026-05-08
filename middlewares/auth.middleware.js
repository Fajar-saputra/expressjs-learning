const  jwt  = require("jsonwebtoken");
const { AppError } = require("../utils/AppError");
const { asycnHandler } = require("../utils/asyncHandler");

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Unauthorized", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next()
    } catch (error) {
        return next(new AppError("Token tidak valid!", 401));
    }
};



module.exports = { protect };
