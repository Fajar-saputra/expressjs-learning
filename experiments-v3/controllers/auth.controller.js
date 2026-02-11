const db = require("../config/db");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new AppError("Username, Email dan Password wajid diisi!!", 400)
    }
    if (username.length < 4 || email.length < 4 || password.length < 4) {
        throw new AppError("Username, Email dan Password minimal 4 karakter!!", 400)
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await db.query("INSERT INTO users (username, email, password) VALUES (?,?,?)", [username, email, hashPassword])

    res.status(201).json({
        success: true,
        message: "Berhasil register"
    })
});


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const [result] = await db.query("SELECT email FROM users WHERE email  = ?", [email])

    if (result[0].length === 0) {
        throw new AppError("User tidak ditemukan!!")
    }

    const isTrue = await bcrypt.compare(password, result[0].password)

    if (!isTrue) {
        throw new AppError("Password salah! Ulangi!");
    }

    const token = jwt.sign({id: result[0].id}, process.env.JWT_SECRET, {expiresIn: '1h'})


    res.status(200).json({
        success: true,
        message: "berhasil login",
        token
    })
});

module.exports = {
    register,
    login,
};

module.exports = { register, login };
