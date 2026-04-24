const { db } = require("../config/db");
const { AppError } = require("../utils/appError");
const { asyncHandlerv1 } = require("../utils/asyncHandler");
const { successResponse } = require("../utils/response");

const getProducts = asyncHandlerv1(async (req, res) => {
    // Tambahkan pagination sebagai standar industri
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const [rows] = await db.execute("SELECT * FROM product LIMIT ? OFFSET ?", [limit.toString(), offset.toString()]);

    successResponse(res, rows, "Berhasil mengambil data produk");
});

const getProductByID = asyncHandlerv1(async (req, res) => {
    const { productId } = req.params;

    const [rows] = await db.execute("SELECT * FROM product WHERE id = ?", [productId]);

    if (rows.length === 0) {
        throw new AppError("Produk tidak ditemukan", 404);
    }

    successResponse(res, rows[0], `Berhasil mengambil produk ID ${productId}`);
});

const createProducts = asyncHandlerv1(async (req, res) => {
    const { name, price, description } = req.body;

    const [result] = await db.execute("INSERT INTO product (name, price, description) VALUES (?,?,?)", [name, price, description || null]);

    successResponse(res, { id: result.insertId, name, price }, "Produk berhasil ditambahkan", 201);
});

const updateProduct = asyncHandlerv1(async (req, res) => {
    const { name, price, description } = req.body;
    const { productId } = req.params;

    const [result] = await db.execute("UPDATE product SET name = COALESCE(?, name), price = COALESCE(?, price), description = COALESCE(?, description) WHERE id = ?", [
        name || null,
        price || null,
        description || null,
        productId,
    ]);

    if (result.affectedRows === 0) {
        throw new AppError("Produk gagal diperbarui (ID tidak ditemukan)", 404);
    }

    successResponse(res, result, "Produk berhasil diperbarui");
});

const deleteProductByID = asyncHandlerv1(async (req, res) => {
    const { productId } = req.params;

    const [result] = await db.execute("DELETE FROM product WHERE id = ?", [productId]);

    if (result.affectedRows === 0) {
        throw new AppError("Produk tidak ditemukan", 404);
    }

    successResponse(res, null, `Berhasil menghapus produk ID ${productId}`);
});

module.exports = { getProducts, createProducts, getProductByID, deleteProductByID, updateProduct };
