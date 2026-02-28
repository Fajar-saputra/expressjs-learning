const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const db = require("../config/db");

// 1. Ambil semua data
const getHobbies = asyncHandler(async (req, res) => {
    const [rows] = await db.execute("SELECT * FROM hobbies ORDER BY name ASC");

    res.status(200).json({
        success: true,
        message: rows.length === 0 ? "hobi masih kosong!" : "Data berhasil diambil!",
        data: rows,
    });
});

// 2. Ambil data berdasarkan ID
const getHobbyById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [rows] = await db.execute("SELECT * FROM hobbies WHERE id = ?", [id]);

    if (rows.length === 0) {
        throw new AppError("ID tidak ditemukan", 404);
    }

    res.status(200).json({
        success: true,
        message: "ID berhasil ditemukan",
        data: rows[0],
    });
});

// 3. Tambah data (Perbaikan typo SQL)
const createHobbies = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    // Perbaikan: Menghapus koma ganda
    const [result] = await db.execute(
        "INSERT INTO hobbies (name, description) VALUES (?,?)", 
        [name, description]
    );

    res.status(201).json({
        success: true,
        message: "berhasil membuat data hobbies baru",
        data: { id: result.insertId, name, description },
    });
});

// 4. Update data (Perbaikan logika pengecekan & variabel)
const updateHobbies = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    // Cek apakah data ada
    const [rows] = await db.execute("SELECT id FROM hobbies WHERE id = ?", [id]);
    if (rows.length === 0) {
        throw new AppError("hobi dengan id tidak ditemukan", 404);
    }

    // Eksekusi update
    const [updateResult] = await db.execute(
        "UPDATE hobbies SET name = COALESCE(?, name), description = COALESCE(?, description) WHERE id = ?", 
        [name || null, description || null, id] // Gunakan null agar COALESCE berfungsi jika field tidak dikirim
    );

    res.status(200).json({
        success: true,
        message: `berhasil update ID : ${id}`,
        changed: updateResult.affectedRows > 0,
    });
});

// 5. Hapus data
const deleteHobbies = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        throw new AppError("ID tidak valid", 400);
    }

    const [result] = await db.execute("DELETE FROM hobbies WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
        throw new AppError("Gagal menghapus! ID tidak ditemukan", 404);
    }

    res.status(200).json({
        success: true,
        message: `berhasil menghapus ID ${id}`,
        data: { id: Number(id) },
    });
});

module.exports = { getHobbies, getHobbyById, createHobbies, updateHobbies, deleteHobbies };