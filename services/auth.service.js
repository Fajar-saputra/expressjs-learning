const { appError } = require("../utils/appError");
const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmail");

const register = async ({ username, email, role = NULL, password }) => {
    const user = await userRepository.findByEmail(email);
    if (user) {
        throw new appError("User sudah register!", 400);
    }

    // hash password
    const hashpassword = await bcrypt.hash(password, 10);

    //  generate verification token
    const verificationToken = await crypto.randomBytes(32).toString("hex");

    // expire time
    const exprireTime = new Date(Date.now + 15 * 60 * 1000);

    // create user
    const user = await userRepository.create({
        username,
        email,
        role,
        password: hashpassword,
        verificationToken,
        verificationExpire: exprireTime,
    });

    // verification url
    const linkUrl = `${process.env.CLIENT_URL}/verification-email/${verificationToken}`;

    // send email
    await sendEmail({
        to: email,
        subject: "Verify Email",
        html: `
            <h2>Verifikasi Email</h2>

            <p>Klik link di bawah:</p>

            <a href="${verifyUrl}">
                Verify Email
            </a>

            <p>Expired 15 menit.</p>
        `,
    });

    return user;
};

const verifyEmail = async (token) => {
    // cek token
    if (!token) throw new appError("Token wajib diisi", 400);
    // cek di db
    const user = await userRepository.findByVerificationToken(token);
    if (!user) throw new appError("Token tidak valid", 400);

    // cek expire
    if (user.verification_expire < Date.now()) throw new appError("Token sudah expire", 400);

    // verify
    await userRepository.veriryUser(user.id);

    return null;
};

const login = async ({ email, password }) => {
    // cek email
    const user = await userRepository.findByEmail(email);
    if (!user) throw new appError("User belum register!", 404);

    // cek verified email
    if (!user.is_verified) throw new appError("Silakan verifikasi email dulu", 401);

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
            expiresIn: "1h",
        },
    );

    // refresh token
    const refreshToken = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "1d",
        },
    );

    // simpan refresh token ke db
    await userRepository.saveRefreshToken(user.id, refreshToken);

    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
        accessToken,
        refreshToken,
    };
};

const logout = async (userId) => {
    return userRepository.removeRefreshToken(userId);
};

const changePassword = async (userId, currentPassword, newPassword) => {
    const user = await userRepository.findByIdWithPassword(userId);
    // cek user ada atau tidak
    if (!user) throw new appError("User tidak ada", 404);

    // verify password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new appError("Password lama salah", 400);

    // password lama tidak boleh sama
    if (currentPassword === newPassword) throw new appError("Password lama tidak boleh sama dengan password baru", 400);

    // hash new password
    const hashNewPassword = await bcrypt.hash(newPassword, 10);

    await userRepository.updatePassword(user.id, hashNewPassword);

    return null;
};

const forgotPassword = async (email) => {
    // cek email
    if (!email) throw new appError("Email wajib diisi", 400);
    const user = await userRepository.findByEmail(email);
    // cek user
    if (!user) throw new appError("User tidak ditemukan!", 404);

    // generate token
    const resetToken = await crypto.randomBytes(32).toString("hex");

    // expire time
    const expireTime = new Date(Date.now() * 15 * 60 * 1000);

    // simpan ke db
    await saveResetToken(user.id, resetToken, expireTime);

    // link reset
    const linkUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await mailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // ganti dengan user.email
        subject: "Reset Password User",
        html: `
        <p>Halo ${user.username || ""},</p>
            <p>Klik link berikut untuk reset password Anda:</p>
            <p><a href="${resetUrl}">${resetUrl}</a></p>
            <p>Link ini berlaku selama 15 menit.</p>

        `,
    });

    return { resetToken };
};

const resetPassword = async (resetToken, newPassword) => {
    // cek token
    if (!resetToken) throw new appError("Token wajib diisi", 400);
    const user = await userRepository.findByResetToken(resetToken);
    // cek user
    if (!user) throw new appError(`Token tidak valid`, 400);

    // cek apakah token tidak kadaluwarsa
    if (user.reset_password_experi < Date.now()) throw new appError("Token telah kadaluwarsa", 400);

    // hash new password
    const hashNewPassword = await bcrypt.hash(newPassword, 10);

    // simpah password baru dan reset token serta expire
    await userRepository.resetPassword(user.id, hashNewPassword);
};

module.exports = {
    login,
    register,
    logout,
    changePassword,
    forgotPassword,
    resetPassword,
    verifyEmail,
};
