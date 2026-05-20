const { appError } = require("../utils/appError");
const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async ({ username, email, role, password }) => {
    const user = await userRepository.findByEmail(email);
    if (user) {
        throw new appError("User sudah register!", 400);
    }

    const hashpassword = await bcrypt.hash(password, 10);

    await userRepository.create({ username, email, role, password: hashpassword });

    return { username, email };
};

const login = async ({ email, password }) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new appError("User belum register!", 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new appError("Password salah", 401);

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1hr" });
    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    };
};

const resetPassword = async (token, newPassword) => {
    const user = await userRepository.findByResetToken(token);
    // cek user ada atau tidak
    if (!user) throw new appError("Token tidak valid", 400);

    // cek expire
    const now = Date.now();

    if (user.reset_password_expire < now) throw new Error("Token sudah expire", 400);

    // hash password baru
    const hashpassword = await bcrypt.hash(newPassword, 10);

    // kirim data ke repo
    await userRepository.resetPassword(user.id, hashpassword);

    return null;
};

const updatePassword = async (userId, { newPassword, currentPassword }) => {
    const user = await userRepository.findByIdWithPassword(userId);
    // cek user ada atau tidak
    if (!user) throw new appError("User tidak ditemukan", 404);

    // cek apakah password cocok
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new appError("Password salah", 400);

    // hash password baru
    const hashpassword = await bcrypt.hash(newPassword, 10);

    // simpan db
    await userRepository.updatePassword(userId, hashpasswords);

    return null;
};

const forgotPassword = async (email) => {
    const user = await userRepository.findByEmail(email);
    // cek user ada atau tidak
    if (!user) throw new appError("User tidak ditemuka", 404);

    // generate token random
    const resetToken = crypto.randomByte(32).toString("hex");
    // expire
    const expire = new Date(Date.now + 15 * 60 * 3600);

    // simpan di db
    await userRepository.saveResetToken(user.id, resetToken, expire);

    // link reset
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    return null;
};

module.exports = { login, register, resetPassword, updatePassword, forgotPassword };
