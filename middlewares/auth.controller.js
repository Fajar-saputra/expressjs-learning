const { AppError } = require("../utils/AppError");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Silakan login terlebih dahulu", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        return next(new AppError("Token tidak valid atau kadaluwarsa", 401));
    }
};

const authorize = (...roles) => (req, res, next) => {
    if (!req.user) {
        return next(new AppError("Unauthorize", 401))
    }
    
    if (!roles.includes(req.user.role)) {
        return next(new AppError("Forbidden", 403))
    }

    next()
}

module.exports = { protect, authorize };
