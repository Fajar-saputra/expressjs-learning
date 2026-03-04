const asyncHandler = require("../utils/asyncHandler");
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Tambahkan ini untuk debugging
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Semua field wajib diisi (username, email, password)",
            received: { username, email, password } // untuk lihat apa yang masuk
        });
    }

    if (typeof password !== "string" || password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password harus string dan minimal 6 karakter"
        });
    }

    const [existingUser] = await db.execute("SELECT email FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
        return res.status(400).json({
            message: "Email sudah terdaftar",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const [result] = await db.execute("INSERT INTO users (username, email, password) VALUES (?,?,?)", [username, email, hashPassword]);

    res.status(201).json({
        success: true,
        message: "Berhasil register",
        data: {
            id: result.insertId,
            username: username,
            email: email,
        },
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email dan password wajib diisi",
            received: { email, password }
        });
    }

    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    // ↑ lebih baik pakai SELECT * supaya ambil id juga

    if (users.length === 0) {
        return res.status(400).json({ message: "Email tidak ditemukan" });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Password salah" });
    }

    // Tambahkan id di payload
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.status(200).json({
        success: true,
        message: "Berhasil login",
        data: { token, username: user.username },
    });
});
module.exports = {login, register}
