const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_ROOT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

db.getConnection()
    .then((conn) => {
        console.log("koneksi database berhasil");
        conn.release();
    })
    .catch((err) => {
        console.log("koneksi database gagal: ", err);
    });

module.exports = { db };
