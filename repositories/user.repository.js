const { db } = require("../config/db");

const findAll = async () => {
    const [rows] = await db.execute("SELECT id, username, email, image FROM users");
    return rows || [];
};

const findByEmail = async (email) => {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0] || null;
};

const findById = async (userId) => {
    const [rows] = await db.execute("SELECT id, username, email, image FROM users WHERE id = ?", [userId]);
    return rows[0] || null;
};

const create = async ({ username, email, password, image }) => {
    const [result] = await db.execute(
        "INSERT INTO users (username, email, password, image) VALUES (?, ?, ?, ?)", 
        [username, email, password, image]
    );
    return result;
};

const update = async (userId, { username, email, password, image }) => {
    const query = `
        UPDATE users 
        SET username = COALESCE(?, username), 
            email = COALESCE(?, email), 
            password = COALESCE(?, password), 
            image = COALESCE(?, image) 
        WHERE id = ?`;
    const [result] = await db.execute(query, [username, email, password, image, userId]);
    return result;
};

const destroy = async (userId) => {
    const [result] = await db.execute("DELETE FROM users WHERE id = ?", [userId]);
    return result;
};

module.exports = { findByEmail, findAll, findById, create, update, destroy };