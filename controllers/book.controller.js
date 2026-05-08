const pool = require("../config/db");

/**
 * GET /books
 * semua user (login) boleh lihat buku
 */
exports.getBooks = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, author, stock FROM books WHERE is_deleted = false"
    );

    res.status(200).json({
      success: true,
      message: "Berhasil ambil data buku",
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /books
 * admin only
 */
exports.createBook = async (req, res, next) => {
  try {
    const { title, author, stock } = req.body;

    if (!title || stock === undefined) {
      return res.status(400).json({
        message: "Title dan stock wajib diisi",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO books (title, author, stock) VALUES (?, ?, ?)",
      [title, author, stock]
    );

    res.status(201).json({
      success: true,
      message: "Buku berhasil ditambahkan",
      data: {
        id: result.insertId,
        title,
        author,
        stock,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /books/:id
 * admin only
 */
exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, stock } = req.body;

    const [result] = await pool.query(
      "UPDATE books SET title=?, author=?, stock=? WHERE id=? AND is_deleted=false",
      [title, author, stock, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Buku tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Buku berhasil diupdate",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /books/:id
 * admin only (soft delete)
 */
exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "UPDATE books SET is_deleted = true WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Buku tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Buku berhasil dihapus",
    });
  } catch (error) {
    next(error);
  }
};
