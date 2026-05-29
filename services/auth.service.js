const { appError } = require("../utils/appError");
const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

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
    // temukan user
    const user = await userRepository.findByEmail(email);
    // cek apakah user ada
    if (!user) throw new appError("User belum register!", 404);
    // cek apakah password yang kirim benar
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new appError("Password salah", 401);
    // access token
    const accessToken = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1hr",
        },
    );
    // refresh token
    const refreshToken = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "1d",
        },
    );
    // simapn refresh token
    await userRepository.saveRefreshToken(user.id, refreshToken);

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    };
};

const updatePassword = async (userId, { newPassword, currentPassword }) => {
    const user = await userRepository.findByIdWithPassword(userId);
    // Cek user ada atau tidak
    if (!user) throw new appError("User tidak ditemukan", 404);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new appError("Password salah", 400);

    // Hash password baru
    const hashPassword = await bcrypt.hash(newPassword, 10);

    await userRepository.updatePassword(userId, hashPassword);

    return null;
};

const forgotPassword = async (email) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new appError("User tidak ditemukan", 404);
    }

    // Generate token
    const resetToken = await crypto.randomBytes(32).toString("hex");

    // Expire 15 menit
    const expire = new Date(Date.now() + 15 * 60 * 1000);

    // Simpan token ke database
    await userRepository.saveResetToken(user.id, resetToken, expire);

    // Buat link reset
    const resetUrl = `${process.env.CLIENT_URL || "http://localhost:3000"}/reset-password/${resetToken}`;

    await mailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Reset Password",
        html: `
            <p>Halo ${user.username || ""},</p>
            <p>Klik link berikut untuk reset password Anda:</p>
            <p><a href="${resetUrl}">${resetUrl}</a></p>
            <p>Link ini berlaku selama 15 menit.</p>
        `,
    });

    return resetToken;
};

const resetPassword = async (token, newPassword) => {
    const user = await userRepository.findByResetToken(token);

    if (!user) {
        throw new appError("Token tidak valid", 400);
    }
    if (user.reset_password_expire.getTime() < Date.now()) {
        throw new appError("Token sudah kadaluarsa", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userRepository.resetPassword(user.id, hashedPassword);
};

const refreshToken = async (refreshToken) => {
    // cek refresh token
    if (!refreshToken) {
        throw new appError("Refresh token wajib ada", 401);
    }
    // verify token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await userRepository.findById(decoded.id);
    // cek
    if (user.refresh_token !== refreshToken) throw new appError("Token tidak valid", 401);
    // access token baru
    const newAccessToken = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m",
        },
    );

    return {
        accessToken: newAccessToken,
    };
};

const logout = async (userId) => {
    return userRepository.removeRefreshToken(userId)
}

module.exports = { login, logout,register, resetPassword, updatePassword, forgotPassword, refreshToken };
