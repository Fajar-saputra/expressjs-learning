const db = require("../config/db");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const getArticles = asyncHandler(async (req, res) => {
    const [rows] = await db.execute("SELECT title, content FROM articles");

    if (rows.length === 0) {
        return res.status(200).json({
            success: true,
            message: "Article masih kosong!",
            data: [],
        });
    }

    res.status(200).json({
        success: true,
        message: "Data berhasil diambil",
        data: rows,
    });
});

const createArticles = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (title.length < 4 || content.length < 4) {
        throw new AppError("title harus lebih dari 4 karakter!", 400);
    }

    const [result] = await db.execute("INSERT INTO articles (title, content) VALUES (?,?)", [title, content]);

    res.status(201).json({
        success: true,
        message: "berhasil menambahkan artikel",
        data: {
            id: result.insertId,
            title,
            content,
        },
    });
});

const updateArticles = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    // Gunakan destructuring [rows] karena ini SELECT
    const [rows] = await db.execute("SELECT id FROM articles WHERE id = ?", [id]);

    // Cek panjang array, bukan affectedRows
    if (rows.length === 0) {
        throw new AppError("Artikel tidak ditemukan!", 404);
    }

    // Eksekusi Update
    // Kita pastikan jika title/content kosong, dikirim sebagai null agar COALESCE bekerja
    const [updateResult] = await db.execute("UPDATE articles SET title = COALESCE(?, title), content = COALESCE(?, content) WHERE id = ?", [title || null, content || null, id]);

    res.status(200).json({
        success: true,
        message: `Berhasil mengubah artikel ID: ${id}`,
        // Memberitahu apakah ada data yang benar-benar berubah atau tidak
        changed: updateResult.changedRows > 0,
    });
});

// VERSI INDUSTRI
// const updateArticleSmart = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const updates = req.body; // Contoh: { title: "Baru", views: 10 }

//     // 1. Ambil kunci-kunci dari body (title, content, dll)
//     const keys = Object.keys(updates);
//     if (keys.length === 0) {
//         throw new AppError("Tidak ada data yang dikirim untuk diupdate", 400);
//     }

//     // 2. Susun string query secara otomatis
//     // Hasilnya: "title = ?, content = ?"
//     const setClause = keys.map(key => `${key} = ?`).join(", ");

//     // 3. Ambil nilai-nilainya
//     // Hasilnya: ["Judul Baru", "Isi Baru", id]
//     const values = [...Object.values(updates), id];

//     // 4. Eksekusi satu kali saja
//     const [result] = await db.execute(
//         `UPDATE articles SET ${setClause} WHERE id = ?`,
//         values
//     );

//     if (result.affectedRows === 0) {
//         throw new AppError("Artikel tidak ditemukan", 404);
//     }

//     res.status(200).json({ success: true, message: "Update berhasil" });
// });

const deleteArticles = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Tambahan: Validasi sederhana sebelum ke DB
    if (isNaN(id)) {
        throw new AppError("ID harus berupa angka!", 400);
    }

    const [result] = await db.execute("DELETE FROM articles WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
        throw new AppError("Gagal menghapus! Artikel tidak ditemukan.", 404);
    }

    res.status(200).json({
        success: true,
        message: "Artikel berhasil dihapus selamanya",
        // Industri terkadang mengirimkan ID kembali untuk sinkronisasi state di React
        data: { id: Number(id) },
    });
});

module.exports = { getArticles, createArticles, deleteArticles, updateArticles };
