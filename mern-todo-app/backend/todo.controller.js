const db = require("./db");
const asyncHandler = require("./utils/asyncHandler");
const AppErr = require("./utils/AppErr");

// Ambil semua Todo
const getTodos = asyncHandler(async (req, res, next) => {
    const [rows] = await db.query("SELECT * FROM todos");
    res.status(200).json({ status: "success", data: rows });
});

// ambil by id
const getTodoById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM todos WHERE id = ?", [id]);

    if (rows.length === 0) {
        throw new AppErr("Todo tidak ditemukan!", 404);
    }

    res.status(200).json({
        success: true,
        message: "Todo ditemukan",
        data: rows[0],
    });
});

// Tambah Todo
const createTodo = asyncHandler(async (req, res, next) => {
    const { task } = req.body;

    if (!task) {
        return next(new AppErr("Task cannot be empty!", 400));
    }

    const [result] = await db.query("INSERT INTO todos (task) VALUES (?)", [task]);
    res.status(201).json({ status: "success", data: { id: result.insertId, task } });
});

const updateTodo = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { task, status } = req.body;

    // Cek apakah id ada di database
    const [todo] = await db.query("SELECT * FROM todos WHERE id = ?", [id]);
    if (todo.length === 0) {
        return next(new AppErr("Todo tidak ditemukan!", 404));
    }

    // Update data (menggunakan COALESCE agar jika data tidak dikirim, tetap pakai data lama)
    await db.query("UPDATE todos SET task = COALESCE(?, task), status = COALESCE(?, status) WHERE id = ?", [task, status, id]);

    res.status(200).json({ status: "success", message: "Todo berhasil diperbarui" });
});

// DELETE Todo
const deleteTodo = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM todos WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
        return next(new AppErr("Gagal menghapus! Todo tidak ditemukan.", 404));
    }

    res.status(200).json({ status: "success", message: "Todo berhasil dihapus" });
});

module.exports = { getTodos, createTodo, updateTodo, deleteTodo, getTodoById };
