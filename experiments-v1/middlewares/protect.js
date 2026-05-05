const { AppError } = require("../utils/appError");
const jwt = require('jsonwebtoken')


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

        req.user = decoded; // simpan user info
        next();
    } catch (error) {
        return next(new AppErroror("Token tidak valid", 401));
    }
};

module.exports = {protect}