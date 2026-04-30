const { db } = require("../config/db");
const { AppError } = require("../utils/AppError");
const { asyncHandlerv1 } = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const productService = require('../services/product.service')
 
const getProducts = asyncHandlerv1(async (req, res) => {
    const filters = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        search: req.query.search,
        category: req.query.category
    }
    const products = await productService.getProducts(filters)
    successResponse(res, products, "Product berhasil diambil", 200);
});

const getProductById = asyncHandlerv1(async (req, res) => {
    const product = await productService.getProductById(req.params.productId)
    successResponse(res, product, "Product berhasil ditemukan", 200);
});

const createProducts = asyncHandlerv1(async (req, res) => {
    const product = await productService.createNewProduct(req.body)
    successResponse(res, product, "Product berhasil ditambahkan", 201);
});

const updateProducts = asyncHandlerv1(async (req, res) => {
    const { productId } = req.params;
    const { name, price, description } = req.body;

    const sql = `
        UPDATE products 
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
    const [result] = await db.execute("DELETE FROM products WHERE id = ?", [productId]);

    if (result.affectedRows === 0) {
        throw new AppError("Product tidak ditemukan atau gagal dihapus", 404);
    }

    successResponse(res, null, "Product berhasil dihapus", 200);
});

module.exports = { createProducts, getProducts, getProductById, deleteProducts, updateProducts };
