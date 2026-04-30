const { db } = require("../config/db");

const findByEmail = async (email) => {
    const [user] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return user[0] || null;
};

const create = async (username, email, passowrd) => {
    const [result] = await db.execute("SELECT INTO users (username, email, password) VALUES (?,?,?)", [username, email, password]);
    return result;
};

module.exports = { findByEmail, create };
