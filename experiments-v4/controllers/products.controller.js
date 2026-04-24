const { db } = require("../config/db");
const { AppError } = require("../utils/AppError");
const { asyncHandlerv1 } = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/respon");

const getProducts = asyncHandlerv1(async (req, res) => {
    const [products] = await db.execute("SELECT * from product");

    successResponse(res, products, "Product berhasil diambil", 200);
});

const getProductById = asyncHandlerv1(async (req, res) => {
    const { productId } = req.params;
    const [rows] = await db.execute("SELECT * FROM product WHERE id = ?", [productId]);

    if (rows.length === 0) {
        throw new AppError("Product tidak ditemukan", 404);
    }

    successResponse(res, rows[0], "Product berhasil ditemukan", 200);
});

const createProducts = asyncHandlerv1(async (req, res) => {
    const { name, price, description } = req.body;
    const [result] = await db.execute("INSERT INTO product (name, price, description) VALUES (?,?,?)", [name, price, description]);

    successResponse(res, { id: result.insertId, name }, "Product berhasil ditambahkan", 201);
});

const updateProducts = asyncHandlerv1(async (req, res) => {
    const { productId } = req.params;
    const { name, price, description } = req.body;

    const sql = `
        UPDATE product 
        SET 
        name = COALESCE(?, name), 
        price = COALESCE(?, price), 
        description = COALESCE(?, description) 
        WHERE id = ?
    `;

    const [result] = await db.execute(sql, [name || null, price || null, description || null, productId]);

    if (result.affectedRows === 0) {
        throw new AppError("Product tidak ditemukan", 404);
    }

    successResponse(res, null, "Product berhasil diperbarui");
});

const deleteProducts = asyncHandlerv1(async (req, res) => {
    const { productId } = req.params;
    const [result] = await db.execute("DELETE FROM product WHERE id = ?", [productId]);

    if (result.affectedRows === 0) {
        throw new AppError("Product tidak ditemukan atau gagal dihapus", 404);
    }

    successResponse(res, null, "Product berhasil dihapus", 200);
});

module.exports = { createProducts, getProducts, getProductById, deleteProducts, updateProducts };
