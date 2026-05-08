const userRepository = require("../repositories/user.repository");
const { AppError } = require("../utils/AppError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async ({ username, email, password }) => {
    const userExits = await userRepository.findByEmail(email);

    if (userExits) throw new AppError("User sudah terdaftar!", 400);

    const hashPassword = await bcrypt.hash(password, 10);

    await userRepository.createUser(username, email, hashPassword);

    return { username, password };
};

const login = async ({ email, password }) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new AppError("Email tidak ditemukan", 404);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new AppError("Password salah!", 401);

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
    );

    return token;
};

module.exports = { register, login };
