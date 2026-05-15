const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    waitForConnections: true,
    connectionLimit: 10,
});

db.getConnection()
    .then((conn) => {
        console.log("Database terhubung!");
        conn.release();
        return;
    })
    .catch((err) => {
        console.log("Database gagal terhubung!");
    });

module.exports = db;
