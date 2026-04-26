const { db } = require("../config/db");
const { AppError } = require("../utils/appError");
const { asyncHandlerv1 } = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");

const getProducts = asyncHandlerv1(async (req, res) => {
    const [rows] = await db.execute("SELECT * FROM products");

    if (rows.length === 0) {
        throw new AppError("Product tidak ditemukan", 404);
    }

    successResponse(res, rows, "Data products berhasil diambil");
});

const getProductById = asyncHandlerv1(async (req, res) => {
    const { productId } = req.params;

    const [result] = await db.execute("SELECT * FROM products WHERE id = ?", [productId]);

    if (result.length === 0) {
        throw new AppError("Product tidak ditemukan", 404);
    }

    successResponse(res, result[0], "Data products berhasil diambil");
});

const createProducts = asyncHandlerv1(async (req, res) => {
    const { name, price, description, category } = req.body;

    const [result] = await db.execute("INSERT INTO products (name, price, description, category) VALUES (?,?,?,?)", [name, price, description, category]);

    successResponse(res, { id: result.insertId, name, category, price, description }, "Data products berhasil dibuat", 201);
});

const updateProducts = asyncHandlerv1(async (req, res) => {
    const { productId } = req.params;
    const { name, price, description, category } = req.body;

    const [result] = await db.execute("UPDATE products SET name = COALESCE(?, name), price = COALESCE(?, price), description = COALESCE(?, description), category=COALESCE(?, category) WHERE id = ?", [
        name,
        price,
        description,
        category,
        productId,
    ]);

    successResponse(res, result[0], "Data products berhasil diperbarui");
});

const deleteProductById = asyncHandlerv1(async (req, res) => {
    const { productId } = req.params;

    const [result] = await db.execute("DELETE FROM products  WHERE id = ?", [productId]);

    if (result.length === 0) {
        throw new AppError("Product tidak ditemukan", 404);
    }

    successResponse(res, result[0], "Data products berhasil diambil");
});

module.exports = { getProducts, getProductById, createProducts, updateProducts, deleteProductById };
