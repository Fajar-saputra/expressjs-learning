const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const db = require("../config/db");

const getProfiles = asyncHandler(async (req, res) => {
    const [rows] = await db.execute("SELECT full_name, bio, phone_number, city FROM profiles");

    if (rows.length === 0) {
        throw new AppError("Profile masih kosong", 404);
    }

    res.status(200).json({
        success: true,
        message: "Berhasil ambil profile user!",
        data: rows,
    });
});

const createProfiles = asyncHandler(async (req, res) => {
    const { full_name, bio, phone_number, city } = req.body;

    // Validasi field wajib
    if (!full_name || !bio || !phone_number || !city) {
        throw new AppError("Semua field wajib diisi!", 400);
    }

    // Validasi panjang karakter
    if (full_name.length < 5 || bio.length < 5 || phone_number.length < 5 || city.length < 5) {
        throw new AppError("Minimal 5 karakter!", 400);
    }

    const [result] = await db.execute("INSERT INTO profiles (full_name, bio, phone_number, city) VALUES (?,?,?,?)", [full_name, bio, phone_number, city]);

    res.status(201).json({
        success: true,
        message: `berhasil buat profile dari user : ${full_name}`,
        data: {
            id: result.insertId,
            full_name,
            bio,
            phone_number,
            city,
        },
    });
});

module.exports = { getProfiles, createProfiles };
