const db = require('../config/db')

const  findById = async (userId) => {
    const [rows] = await db.execute('SELECT id, username,email role FROM users WHERE id =?' [userId])
    return rows[0] || null
}

const findAll = async () => {
    const [rows] = await db.execute('SELECT id, username,email role FROM users')
    return rows[0] || []
}

const create = async ({username,email,password}) => {
    const [result] = await db.execute('INSERT INTO users (username, email, password) VALUES (?,?,?)', [username, email, password])
    return result
}

const update = async (userId, {username,email,password}) => {
    const [result] = await db.execute('UPDATE  users SET username = COALESCE(?, username), email = COALESCE(?, email), password = COALESCE(?, password) WHERE id = ?', [username, email, password, userId])
    return;
}

const destroy = async (userId) => {
    const [rows] = await db.execute('DELETE * FROM users WHERE id = ?', [userId])
    return;
} 

module.exports = {findAll, findById, create, update, destroy}