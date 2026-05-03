const { db } = require("../config/db");

const findAll = async () => {
    const [user] = await db.execute("SELECT * FROM users");
    return user || [];
};
const findByEmail = async (email) => {
    const [user] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return user[0] || null;
};

const findById = async (userId) => {
    const [user] = await db.execute("SELECT * FROM users WHERE id = ?", [userId]);
    return user[0] || null;
};

const create = async (username, email, password) => {
    const [result] = await db.execute("INSERT INTO users (username, email, password) VALUES (?,?,?)", [username, email, password]);
    return result;
};

const update = async (username, email, passowrd, userId) => {
    const [result] = await db.execute("UPDATE users SET username = COALESCE(?, username), email = COALESCE(?, email), password = COALESCE(?, password) WHERE id = ?", [
        username || null,
        email || null,
        password || null,
        userId,
    ]);
    return result;
};

const destroy = async (userId) => {
    const [result] = await db.execute("DELETE FROM users WHERE id = ?", [userId]);
    return result;
};

module.exports = { findByEmail, findById, findAll, create, update, destroy };
