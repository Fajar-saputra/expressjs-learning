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

module.exports ={ register, login}
