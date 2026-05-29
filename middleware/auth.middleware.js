const bcrypt = require("bcrypt");
const { appError } = require("../utils/appError");
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new appError("tidak "));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        console.log(req.user);

        next();
    } catch (error) {
        return next(new appError("Token tidak valid", 401));
    }
};

const authorize =
    (...roles) =>
    (req, res, next) => {
        if (!req.user) {
            return next(new appError("Unauthorized", 401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new appError("Forbidden", 403));
        }

        next();
    };

module.exports = { protect, authorize };
