const authRepository = require("../repositories/auth.repository");
const { AppError } = require("../utils/appError");
const { db } = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async ({username, email, passowrd}) => {
    const user = authRepository.findByEmail(email);

    if (user) throw new AppError("Email sudah terdaftar!", 400);

    const hashPassword = bcrypt.hash(passowrd, 10);

    await authRepository.create(username, email, hashPassword);

    return { username, email };
};

const login = async ({email, passowrd}) => {
    const user = await authRepository.findByEmail(email);

    if (!user) throw new AppError("Email tidak ditemukan", 404);

    const isMatch = bcrypt.compare(passowrd, user.passowrd);

    if (!isMatch) throw new AppError("Password salah", 401);

    let token = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
    );

    return token;
};

module.exports = {login, register}
