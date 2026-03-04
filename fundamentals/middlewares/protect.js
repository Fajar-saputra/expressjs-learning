const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncHandler')
const AppError = require('../utils/AppError')
require('dotenv').config()
const db = require('../config/db')


const protect =asyncHandler(async (req, res, next) => {
    // const authHedaer = req.headers.authorization
    let token;
    // cek apakah ada header authorization yang dimulai dari bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // ambil token nya saya (buang kata) bearer
            token = req.headers.authorization.split(' ')[1];
            // verifikasi token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // ambil data user (tanpa password)
            const [users] = await db.execute(
                "SELECT id, username, email FROM users WHERE id = ?",
                [decoded.id]
            )

            if (users.length === 0) {
                throw new AppError("User pemilik token ini sudah tidak ada", 401)
            }

            // simpan data ke req.user
            req.user = users[0]
        } catch (error) {
            throw new AppError("Token tidak valid atau kadaluwarsa", 401);
        }
    }

    if (!token) {
     throw new AppError("Anda belum login, silahkan login terlebih dahulu", 401);
    }

    next()
})

module.exports = {protect}
