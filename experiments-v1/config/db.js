const mysql = require("mysql2/promise")

const db = mysql.createPool({
    host: "localhost",
    user: 'root',
    database: 'experiments-v1',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = db;