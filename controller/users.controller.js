const {db} = require("../config/db");
const {asyncHandlerv2} = require("../utils/asyncHandler");
const {AppError} = require("../utils/AppError");

const getUsers = asyncHandlerv2(async (req, res) => {
    const query = "SELECT username, email FROM users";
    const [rows] = await db.query(query);

    if (rows.length === 0) {
        return res.status(200).json({
            success: true,
            message: "Data user masih kosong!",
            data: [],
        });
    }

    res.status(200).json({
        success: true,
        message: "Data user diambil!",
        count: rows.length,
        data: rows,
    });
});

const getUserById = asyncHandlerv2(async (req, res, next) => {
    const { id } = req.params;

    const [rows] = await db.query("SELECT id, username FROM users WHERE id = ?", [id]);

    if (rows.length === 0) {
        throw new AppError(`User dengan ID ${id} tidak ditemukan`, 404);
    }

    // lebih keren
    // const [[user]] = await db.query("SELECT id, username FROM users WHERE id = ?", [id]);

    // if (!user) {
    //     throw new AppError("User tidak ditemukan", 404);
    // }

    res.status(200).json({
        success: true,
        message: `User dengan ID ${id} ditemukan!`,
        data: rows[0],
    });
});

const createUser = asyncHandlerv2(async (req, res) => {
    let { username, email } = req.body;

    // 1. Validasi keberadaan data
    if (!username || !email) {
        throw new AppError("Nama dan email wajib diisi!", 400);
    }

    // 2. Sanitasi & Validasi tipe data
    username = username.trim();
    if (username.length < 3) {
        throw new AppError("Nama minimal 3 karakter!", 400);
    }

    if (email < 0 || email > 120) {
        throw new AppError("Umur tidak masuk akal!", 400);
    }

    // 3. Cek Duplikasi (Opsional, tergantung kebutuhan)
    const [check] = await db.query("SELECT id FROM users WHERE username = ?", [username]);
    if (check.length > 0) {
        throw new AppError("User dengan username ini sudah ada!", 400);
    }

    // 4. Insert data
    const [result] = await db.query("INSERT INTO users (username, email) VALUES (?,?)", [username, email]);

    res.status(201).json({
        success: true,
        message: "User berhasil ditambahkan!",
        data: {
            id: result.insertId,
            username,
            email,
        },
    });
});
const deleteUserById = asyncHandlerv2(async (req, res) => {
    const { id } = req.params;

    // 1. Validasi sederhana: pastikan ID bukan sesuatu yang aneh
    if (!id || isNaN(id)) {
        throw new AppError("ID user tidak valid!", 400);
    }

    // 2. Eksekusi Delete
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

    // 3. Cek apakah ada baris yang terpengaruh
    if (result.affectedRows === 0) {
        throw new AppError(`User dengan ID ${id} tidak ditemukan`, 404);
    }

    // 4. Respon sukses
    res.status(200).json({
        success: true,
        message: `User dengan ID ${id} berhasil dihapus selamanya`,
    });
});

const deleteAllUsers = asyncHandlerv2(async (req, res) => {
    // 1. Cek dulu apakah tabel memang ada isinya
    // LIMIT 1 sudah cukup untuk memastikan tabel tidak kosong
    const [check] = await db.query("SELECT id FROM users LIMIT 1");

    if (check.length === 0) {
        throw new AppError("Tabel sudah kosong, tidak ada data untuk dihapus", 400);
    }

    // 2. Eksekusi pengosongan tabel
    // TRUNCATE lebih cepat dari DELETE untuk mengosongkan tabel besar
    await db.query("TRUNCATE TABLE users");

    res.status(200).json({
        success: true,
        message: "Seluruh data user telah dikosongkan (Reset)",
    });
});

module.exports = { getUsers, getUserById, createUser, deleteUserById, deleteAllUsers };
