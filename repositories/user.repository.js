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
    return result;
};

const destroy = async (userId) => {
    return db.execute("DELETE * FROM users WHERE id = ?", [userId]);
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

module.exports = { findAll, findById, findByEmail, findByIdWithPassword, create, update, destroy,updatePassword, saveRefreshToken, removeRefreshToken };
