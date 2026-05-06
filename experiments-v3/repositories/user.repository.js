const { db } = require("../config/db");

const getAll = async () => {
    const [rows] = await db.execute("SELECT id, username, email FROM users");
    return rows || [];
};

const findByEmail = async (email) => {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0] || null;
};

const findById = async (userId) => {
    const [rows] = await db.execute("SELECT id, username, email, role FROM users WHERE id = ?", [userId]);
    return rows[0] || null;
};

const create = async (username, email, password, image) => {
    const [result] = await db.execute("INSERT INTO users (username, email, password, image) VALUES (?,?,?, ?)", [username, email, password, image]);
    return result;
};

const update = async ({ username, email, password }, userId) => {
    const [result] = await db.execute("UPDATE users SET username = COALESCE(?, username), email = COALESCE(?, email), password = COALESCE(?, password) WHERE id = ?", [
        username || null,
        email || null,
        password || null,
        userId,
    ]);
    return result;
};

const destroy = async (userId) => {
    const [rows] = await db.execute("DELETE FROM users WHERE id = ?", [userId]);
    return rows;
};

module.exports = { getAll, findByEmail, findById, create, destroy, update };
