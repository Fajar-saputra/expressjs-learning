const bcrypt = require("bcrypt");
const pool = require("../config/db");
const jwtUtil = require("../utils/jwt");

const asynHandler = require("../utils/asyncHandler");
const appError = require("../utils/AppError");

exports.register = asynHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new appError("Data wajib diisi!!")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

    res.status(201).json({
        success: true,
        message: "Register berhasil",
    });
});

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "User tidak ditemukan" });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password salah" });
        }

        const token = jwtUtil.generateToken({
            id: user.id,
            role: user.role,
        });

        res.status(200).json({
            success: true,
            message: "Login berhasil",
            token,
        });
    } catch (error) {
        next(error);
    }
};
