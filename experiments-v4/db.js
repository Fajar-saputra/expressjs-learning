const mysql = require('mysql2/promise')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'fundamentals',
  waitForConnections: true,
  connectionLimit: 10,
});

 module.exports = db 