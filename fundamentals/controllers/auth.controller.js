const db = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");
const appError = require("../utils/AppError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = asyncHandler(async (req, res) => {
    const { email, nim, password, nama } = req.body;

    const [isExiting] = await db.execute("SELECT email FROM users WHERE email= ?", [email]);

    if (isExiting.length > 0) {
        throw new appError("Email sudah terdaftar!", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const query = `INSERT INTO users (email, nim, password, nama) VALUES (?,?,?,?)`;

    const [result] = await db.execute(query, [email, nim, hashPassword, nama]);

    res.status(201).json({
        success: true,
        mesage: "Berhasil register!",
        data: {
            id: result.insertId,
            nama,
            email,
        },
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const [result] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (result.length === 0) {
        throw new appError("Email belum terdaftar!", 401);
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            message: "Password salah!",
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            rule: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        },
    );

    const { password: hashedPassword, ...userWithoutPassword } = result[0];

    res.status(200).json({
        success: true,
        message: "Berhasil login",
        data: {
            userWithoutPassword,
            token,
        },
    });
});

// 1. Cek Login (Token)
const protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new AppError("Silakan login!", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {expiresIn: '1h'});
    const [rows] = await db.execute("SELECT id, nama, role FROM users WHERE id = ?", [decoded.id]);
    
    if (rows.length === 0) throw new AppError("User tidak ditemukan", 401);
    req.user = rows[0];
    next();
});

// 2. Cek Role (Otoritas)
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new AppError("Anda tidak punya akses ke fitur ini!", 403);
        }
        next();
    };
};

module.exports = { register, login, protect, restrictTo };
