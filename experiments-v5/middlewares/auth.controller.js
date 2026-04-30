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

module.exports = { protect };
