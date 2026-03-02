const { asyncHandler } = require("../utils/asyncHandler");
const db = require("../config/db");
const { AppError } = require("../utils/appError");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // 1. cek email sudah terdaftar?
    const [existingUser] = await db.execute("SELECT email FROM users WHERE email = ?", [email]);

    if (existingUser.length > 0) {
        throw new AppError("Email sudah didaftarkan!", 400);
    }

    // 2. salt & hash
    // salt (menambahkan karater pada password) & hash passowrd (mengubah password menjadi string acak)
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // 3. simpan ke database
    const [result] = await db.execute("INSERT INTO users (username, email, password) VALUES (?,?,?)", [username, email, hashPassword]);

    res.status(201).json({
        success: true,
        message: "berhasil register",
        data: {
            id: result.insertId,
            username,
            email,
        },
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Cari user berdasarkan email
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
        throw new AppError("Email atau Password salah", 401);
    }

    const user = users[0];

    // 2. Cek Password (Bandingkan password input dengan yang di DB)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError("Email atau Password salah", 401);
    }

    // 3. Buat Token JWT
    const token = jwt.sign(
        { id: user.id, username: user.username }, // Payload (data yang disimpan)
        process.env.JWT_SECRET,                  // Kunci rahasia (simpan di .env)
        { expiresIn: '1d' }                      // Masa berlaku (1 hari)
    );

    res.status(200).json({
        success: true,
        message: "Login berhasil!",
        token // Kirim token ini ke user
    });
});

module.exports = { register, login };
