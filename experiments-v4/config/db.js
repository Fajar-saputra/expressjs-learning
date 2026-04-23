const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
});

db.getConnection()
    .then((conn) => {
        console.log("Terhubung ke database");
        conn.release();
    })
    .catch((err) => {
        console.log("Koneksi database gagal : ", err);
    });

module.exports = { db };
