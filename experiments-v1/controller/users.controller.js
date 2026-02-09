const pool = require("../db/pool");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

exports.getUsers = asyncHandler(async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM users");

    res.status(200).json({
        success: true,
        message: "Berhasil ambil users",
        data: rows,
    });
});

exports.createUsers = asyncHandler(async (req, res) => {
    const { nama, umur } = req.body;

    if (!nama || !umur) {
        throw new AppError("Nama dan umur wajib diisi", 400);
    }

    const [result] = await pool.query("INSERT INTO users (nama, umur) VALUES (?, ?)", [nama, umur]);

    res.status(201).json({
        success: true,
        message: "User berhasil dibuat",
        data: {
            id: result.insertId,
            nama,
            umur,
        },
    });
});

exports.getUsersById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

    if (rows.length === 0) {
        throw new AppError("User tidak ditemukan!!", 404);
    }

    if (isNaN(id)) {
        throw new AppError("ID harus berupa angka!", 400);
    }

    res.status(200).json({
        success: true,
        message: "User ditemukan",
        data: rows[0],
    });
});

exports.deleteUsers = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const [result] = await pool.query(
        "DELETE FROM users WHERE id = ?",
        [id]
    );

    // kalau tidak ada row yang terhapus
    if (result.affectedRows === 0) {
        throw new AppError("User tidak ditemukan", 404);
    }

    res.status(200).json({
        success: true,
        message: "User berhasil dihapus",
    });
});
