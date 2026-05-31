const db = require("../config/db");

const findAll = async () => {
    const [rows] = await db.execute("SELECT id, username,email, role FROM users");
    return rows || [];
};

const findById = async (userId) => {
    const [rows] = await db.execute("SELECT id, username,email, role FROM users WHERE id =?", [userId]);
    return rows[0] || null;
};

const findByEmail = async (email) => {
    const [rows] = await db.execute("SELECT * FROM users WHERE email =?", [email]);
    return rows[0] || null;
};

const findByIdWithPassword = async (userId) => {
    const [rows] = await db.execute("SELECT password FROM users WHERE id = ?", [userId]);
    return rows[0] || null;
};

const findByVerificationToken = async (token) => {
    const [rows] = await db.execute("SELECT verification_expire FROM users WHERE  verification_token = ?", [token]);
    return rows[0] || null;
};

const veriryUser = async (userId) => {
    await db.execute(
        `
        UPDATE users
        SET
        is_verified = true,
        verification_expire = NULL,
        verification_token = NULL
        WHERE id = ?`,
        userId,
    );
};

const create = async ({ username, email, role = "user", password, verificationToken, verificationExpire }) => {
    const [result] = await db.execute(
        `
        INSERT INTO
        users (username, email, password, role, verificationToken,verificationExpire )
        VALUES (?,?,?, ?)`,
        [username, email, password, role, verificationToken, verificationExpire],
    );
    return { id: result.insertId, username: username, email: email };
};

const update = async (userId, { username, email, password }) => {
    const [result] = await db.execute("UPDATE  users SET username = COALESCE(?, username), email = COALESCE(?, email), password = COALESCE(?, password) WHERE id = ?", [
        username,
        email,
        password,
        userId,
    ]);
    return result;
};

const destroy = async (userId) => {
    return db.execute("DELETE FROM users WHERE id = ?", [userId]);
};

const updatePassword = async (userId, hashNewPassword) => {
    return db.execute("UPDATE users SET password = ? WHERE id = ?", [hashNewPassword, userId]);
};

const saveRefreshToken = async (userId, refreshToken) => {
    await db.execute("UPDATE users SET refresh_token = ? WHERE id = ?", [refreshToken, userId]);
};

const removeRefreshToken = async (userId) => {
    await db.execute("UPDATE users SET refresh_token = NULL WHERE id = ?", [userId]);
};

const saveResetToken = async (userId, resetToken, expireTime) => {
    await db.execute(
        `UPDATE users SET 
        reset_password_token = ?,
        reset_password_expire = ?
        WHERE id = ?`,
        [resetToken, expireTime, userId],
    );
};

const findByResetToken = async (resetToken) => {
    const [result] = await db.execute(
        `
        SELECT reset_password_expire FROM users
        WHERE reset_password_token = ?`,
        [resetToken],
    );

    return result[0] || null;
};

const resetPassword = async (userId, newPassword) => {
    await db.execute(
        `
        UPDATE users
        SET password = ?,
        reset_password_token = NULL,
        reset_password_exprire = NULL
        WHERE id = ?`,
        [newPassword, userId],
    );
};

module.exports = {
    findAll,
    findById,
    findByEmail,
    findByIdWithPassword,
    findByVerificationToken,
    create,
    update,
    destroy,
    updatePassword,
    saveRefreshToken,
    removeRefreshToken,
    saveResetToken,
    findByResetToken,
    resetPassword,
};
