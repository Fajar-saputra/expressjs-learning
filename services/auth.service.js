const  jwt  = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");
const { AppError } = require("../utils/appError");
const bcrypt = require('bcryptjs')

const login = async ({ email, password }) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new AppError("Email tidak ditemukan!", 404);

    const isTrue = await bcrypt.compare(password, user.password);
    if (!isTrue) throw new AppError("Password salah!", 401);

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        },
    );

    return { token };
};

const register = async ({ username, email, password }) => {
    const user = await userRepository.findByEmail(email);
    if (user) throw new AppError("Email sudah terdaftar", 400);

    const hashPassword = await bcrypt.hash(password, 10);

    await userRepository.create(username, email, hashPassword)

    return { username, email };
};

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return next(new AppError("Unauthorized", 401))
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch (error) {
        return next(new AppError("Token tidak valid", 401));
    }
}

const authorize = (...roles) => (req, res, next) =>  {
    if (!req.user) {
        return next(new AppError("Unauthorized", 401))   
    }

    if (!roles.includes(req.user.role)) {
        return next(new AppError("Forbidden", 403))
    }

    next();
}

const updatePassword = async (userId, body) => {
    const { currentPassword, newPassword } = body;

    const user = await userRepository.findByIdWithPassword(userId);

    if (!user) {
        throw new AppError("User tidak ditemukan", 404);
    }

    const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isMatch) {
        throw new AppError("Password lama salah", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userRepository.updatePassword(
        userId,
        hashedPassword
    );

    return null;
};

module.exports ={ register, login, protect, authorize, updatePassword}
