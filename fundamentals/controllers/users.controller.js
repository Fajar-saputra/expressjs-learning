const appError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const db = require("../config/db");

const getAllUsers = asyncHandler(async (req, res) => {
    const [rows] = await db.execute("SELECT * FROM users ORDER BY nama ASC");

    if (rows.length === 0) {
        return res.status(200).json({
            success: true,
            message: "User masih kosong!",
            data: [],
        });
    }

    res.status(200).json({
        success: true,
        message: "Berhasil ambil data",
        data: rows,
    });
});

const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const [anggota] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);

    if (anggota.length === 0) {
        return res.status(404).json({
            message: "User tidak ditemukan",
        });
    }

    res.status(200).json({
        success: true,
        message: `Berhasil ambil user ID ${id}`,
        data: anggota[0],
    });
});

// const updateUser = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const data = req.body;

//     // 1. Cek keberadaan user terlebih dahulu
//     const [user] = await db.execute("SELECT id FROM anggota WHERE id = ?", [id]);
//     if (user.length === 0) {
//         throw new appError("Pengguna tidak ditemukan!", 404);
//     }

//     // 2. Query Update dengan COALESCE
//     // Jika data.nama adalah undefined/null, maka SQL akan tetap memakai nilai 'nama' yang lama
//     const query = `
//         UPDATE anggota SET
//             nim = COALESCE(?, nim),
//             nama = COALESCE(?, nama),
//             jurusan = COALESCE(?, jurusan),
//             prodi = COALESCE(?, prodi),
//             semester = COALESCE(?, semester),
//             angkatan = COALESCE(?, angkatan),
//             email = COALESCE(?, email),
//             no_telepon = COALESCE(?, no_telepon),
//             tanggal_daftar = COALESCE(?, tanggal_daftar),
//             tanggal_akhir_aktif = COALESCE(?, tanggal_akhir_aktif),
//             alamat = COALESCE(?, alamat),
//             foto = COALESCE(?, foto)
//         WHERE id = ?
//     `;

//     // 3. Mapping data. Jika field tidak dikirim di req.body, kirimkan null ke query
//     const values = [
//         data.nim || null,
//         data.nama || null,
//         data.jurusan || null,
//         data.prodi || null,
//         data.semester || null,
//         data.angkatan || null,
//         data.email || null,
//         data.no_telepon || null,
//         data.tanggal_daftar || null,
//         data.tanggal_akhir_aktif || null,
//         data.alamat || null,
//         data.foto || null,
//         id
//     ];

//     await db.execute(query, values);

//     res.status(200).json({
//         success: true,
//         message: "Data pengguna berhasil diperbarui secara parsial",
//         data: { id }
//     });
// });
// lebih keren
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    // 1. Definisikan urutan kolom sesuai dengan query SQL
    const fields = ["nim", "nama", "email"];            

    // 2. Map data secara dinamis, pastikan diakhiri dengan ID untuk WHERE clause
    const values = fields.map((field) => data[field] ?? null);
    values.push(id);

    // 3. Query Update dengan COALESCE
    const query = `
        UPDATE anggota SET 
            ${fields.map((field) => `${field} = COALESCE(?, ${field})`).join(", ")}
        WHERE id_anggota = ?
    `;

    const [result] = await db.execute(query, values);

    if (result.affectedRows === 0) {
        throw new appError("Pengguna tidak ditemukan!", 404);
    }

    res.status(200).json({
        success: true,
        message: "Data berhasil diperbarui secara dinamis",
        data: { id },
    });
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // 1. Cek keberadaan user sebelum dihapus
    // Tip: Gunakan SELECT 1 atau SELECT id saja agar query lebih ringan daripada SELECT *
    const [users] = await db.execute("SELECT id_anggota FROM anggota WHERE id_anggota = ?", [id]);

    if (users.length === 0) {
        throw new appError("User tidak ditemukan!", 404);
    }

    // 2. Eksekusi DELETE
    // Perhatikan: SQL DELETE butuh kata kunci 'FROM'
    const [result] = await db.execute("DELETE FROM anggota WHERE id_anggota = ?", [id]);

    // 3. Response
    res.status(200).json({
        success: true,
        message: `Berhasil menghapus anggota dengan ID: ${id}`,
        data: {
            id_anggota: id, // Gunakan 'id' dari params, karena DELETE tidak menghasilkan 'insertId'
            affectedRows: result.affectedRows, // Opsional: untuk memastikan jumlah baris yang terhapus
        },
    });
});

module.exports = { getAllUsers, getUserById, createUser, deleteUser, updateUser };
