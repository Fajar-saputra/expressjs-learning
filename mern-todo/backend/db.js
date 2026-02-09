const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection()
    .then((conn) => {
        console.log('Terhubung ke database MySQL!');
        conn.release();
    })
    .catch((err) => {
        console.error('Koneksi database gagal:', err.message);
    });

module.exports = db;
