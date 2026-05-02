const { db } = require("../config/db");

const findByEmail = async (email) => {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0] || null;
};

const createUser = async (username, email, password) => {
    const [result] = await db.execute("INSERT INTO users (username, email, password) VALUES (?,?,?)", [username, email, password]);
    return result;
};

const findById = async (userId) => {
    const [rows]= await db.execute('SELECT username, email FROM  users WHERE id = ?', [userId])

    return rows[0] || null;
}

module.exports = { findByEmail, createUser };
