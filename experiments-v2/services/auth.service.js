const authRepository= require('../repositories/auth.repository')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')

const register = async ({ username, email, password }) => {
    const user = await authRepository.findByEmail(email); 

    if (user) throw new AppError("Email sudah terdaftar!", 400);

    const hashPassword = await bcrypt.hash(password, 10);
    await authRepository.create(username, email, hashPassword);

    return { username, email };
};

const login = async ({ email, password }) => {
    const user = await authRepository.findByEmail(email);

    if (!user) throw new AppError("Email belum terdaftar!", 400);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new AppError("Password salah", 401);

    let token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
    );

    return { token };
};

module.exports = {register, login}