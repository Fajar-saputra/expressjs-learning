const asyncHandler = require("../utils/asyncHandler");
const appError = require("../utils/AppError");
const pool = require("../config/db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config()

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // chcek user
    const [existingUser] = await pool.execute("SELECT email FROM users WHERE email =? ", [email]);

    if (existingUser.length > 0) {
        throw new appError("Email sudah terdaftar!", 400);
    }

    // salt & hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // simpan ke database
    const [result] = await pool.execute("INSERT INTO users (username, email, password) VALUES (?,?,?)", [username, email, hashPassword]);

    // respon
    res.status(201).json({
        success: true,
        message: "Berhasil register!",
        data: {
            id: result.insertId,
            username: username,
        },
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check email
    const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
        // return res.status(200).json({
        //     success: true,
        //     message: `User dengan email ${email} belum terdaftar!`,
        // });
        throw new appError("Email atau Password salah", 401);  
    }

    const user = users[0];

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new appError("Password salah!!", 400);
    }

    const token = jwt.sign(
        {
            id: user.id,
            user: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        });

    res.status(200).json({
        success: true,  
        message: "berhasil login",
        data: {
            id: user.id,
            username: user.username,
            token,
        },
    });
});

const protect = asyncHandler( async (req, res) => {
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader?.startWith('Bearer')) {
        token = authHeader.split('')[1];
    }

    if (!token) {
        throw new appError("Silahkan login untuk mengakses halaman ini!", 401)
    }

    try {
        // verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // cek user masih ada di database
        const [users] = await pool.execute('SELECT id, username, email FROM users WHERE id = ?', [decoded.id])

        if (users.length === 0) {
            throw new appError("User pemilik token sudah tidak daftar", 401)
        }

        // simpan ke req.user agar bisa diakses controller berikutnya
        req.user = users[0]
        next();
    } catch (error) {
        throw new appError("Token tidak valid atau kadaluarwa", 401)
    }

})

module.exports = { login, register };
