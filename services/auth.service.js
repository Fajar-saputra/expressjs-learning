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
    const user = await userRepository.findByEmail(email);
    if (!user) throw new appError("User belum register!", 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new appError("Password salah", 401);

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1hr",
        },
    );
    return {
        token,
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
    const resetToken = await crypto.randomBytes(32).toString('hex');

    // Expire 15 menit
    const expire = new Date(Date.now() + 15 * 60 * 1000);

    // Simpan token ke database
    await userRepository.saveResetToken(user.id, resetToken, expire);

    // Buat link reset
    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

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

module.exports = { login, register, resetPassword, updatePassword, forgotPassword };
