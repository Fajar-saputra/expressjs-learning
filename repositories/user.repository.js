const db = require("../config/db");

const findById = async (userId) => {
    const [rows] = await db.execute("SELECT id, username,email, role FROM users WHERE id =?", [userId]);
    return rows[0] || null;
};

const findByEmail = async (email) => {
    const [rows] = await db.execute("SELECT * FROM users WHERE email =?", [email]);
    return rows[0] || null;
};

const findAll = async () => {
    const [rows] = await db.execute("SELECT id, username,email, role FROM users");
    return rows || [];
};

const findByResetToken = async (token) => {
    const [rows] = await db.execute(
        `SELECT id, reset_password_expire 
             FROM users 
             WHERE reset_password_token = ?`,
        [token],
    );
    return rows[0];
};

const findByIdWithPassword = async (userId) => {
    const [rows] = await db.execute("SELECT password FROM users WHERE id = ?", [userId]);
    return rows[0];
};

const updatePassword = async (userId, password) => {
    await db.execute("UPDATE users SET password = ? WHERE id = ?", [password, userId]);
};

const resetPassword = async (userId, hashedPassword) => {
    await db.execute(
        `UPDATE users 
             SET password = ?, 
                 reset_password_token = NULL, 
                 reset_password_expire = NULL 
             WHERE id = ?`,
        [hashedPassword, userId],
    );
};

const saveResetToken = async (userId, resetToken, expireTime) => {
    await db.execute(
        `UPDATE users 
             SET reset_password_token = ?, 
                 reset_password_expire = ? 
             WHERE id = ?`,
        [resetToken, expireTime, userId],
    );
};

const saveRefreshToken = async (userId, refreshToken) => {
    await db.execute('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, userId])
}

const removeRefreshToken = async (userId) => {
    await db.execute('UPDATE users SET refresh_token = NULL WHERE id = ?', [userId])
    return null;
}

const create = async ({ username, email, password, role }) => {
    const [result] = await db.execute("INSERT INTO users (username, email, password, role) VALUES (?,?,?, ?)", [username, email, password, role]);
    return result;
};

const update = async (userId, { username, email, password }) => {
    const [result] = await db.execute("UPDATE  users SET username = COALESCE(?, username), email = COALESCE(?, email), password = COALESCE(?, password) WHERE id = ?", [
        username,
        email,
        password,
        userId,
    ]);
    return;
};

const destroy = async (userId) => {
    const [rows] = await db.execute("DELETE * FROM users WHERE id = ?", [userId]);
    return;
};

module.exports = { findAll, findById, findByEmail, findByResetToken, findByIdWithPassword, resetPassword, updatePassword, saveResetToken, create, update, destroy, removeRefreshToken };
