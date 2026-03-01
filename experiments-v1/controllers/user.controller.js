const {AppError} = require("../utils/appError");
const {asyncHandler} = require("../utils/asyncHandler");  
const db = require("../config/db");

const getUsers = asyncHandler(async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM  users');

    if (rows.length === 0) {
        return res.status(200).json({
            success: true,
            message: "data masih kosong",
            data: []
        })
    }

    res.status(200).json({
        success: true,
        message: "berhasil mengambil data",
        data: rows
    })
    
});

const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const [rows] = await db.execute(
        "SELECT id, username, email FROM users WHERE id = ?",
        [id]
    );

    // Jika user tidak ditemukan
    if (rows.length === 0) {
        return res.status(404).json({
            success: false,
            message: `User dengan ID ${id} tidak ditemukan`
        });
    }

    // Jika ditemukan
    res.status(200).json({
        success: true,
        message: `Berhasil ambil user dengan ID ${id}`,
        data: rows[0]
    });
});

const createUsers = asyncHandler( async (req, res) => {
    const { username, email, password } = req.body;

    const [result] = await db.execute("INSERT INTO users (username, email, password) VALUES (?,?,?)", [username, email, password])

    res.status(201).json({
        success: true,
        message: "berhasil menambahkan user baru",
        data: {
            id: result.insertId,
            username: username,
            email: email
        }
    })
})

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;


    const [rows] = await db.execute("SELECT id FROM users WHERE id = ?", [id])

    if (rows.length === 0) {
        throw new AppError("User tidak ditemukan", 404)
    }

    const [result] = await db.execute("UPDATE users SET username = COALESCE(?, username), email = COALESCE(?, email), password = COALESCE(?, password) WHERE id = ?", [username || null, email || null, password|| null, id || null])

    res.status(200).json({
        success: true,
        message: `berhasil update user ID ${id}`,
        data: {
            changed: result.changedRows > 0
        }
    })


})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id])

    if (result.affectedRows === 0) {
        throw new AppError("User tidak ditemukan!", 404)
    }

    res.status(200).json({
        success: true,
        message: `Berhasil hapus user ID ${id}`,
    })
})

module.exports = {getUsers, createUsers, getUserById, deleteUser, updateUser}