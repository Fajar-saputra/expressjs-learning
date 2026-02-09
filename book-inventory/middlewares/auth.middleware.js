const bcrypt = require("bcrypt");
const pool = require("../config/db");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");

exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
        throw new AppError("Email dan password wajib diisi", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
    );

    res.status(201).json({
        success: true,
        message: "Register berhasil",
    });
});
