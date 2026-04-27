const { db } = require("../config/db");
const { AppError } = require("../utils/appError");
const { asyncHandlerv1 } = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");

const productService = require("../services/products.service");

const getProducts = asyncHandlerv1(async (req, res) => {
    const { page = 1, limit = 10, search, minPrice, maxPrice, category } = req.query;

    // Convert string to numbers where needed
    const filters = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        search,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        category,
    };

    const result = await productService.getAll(filters);
    successResponse(res, result, "Berhasil ambil data");
});

const getProductById = asyncHandlerv1(async (req, res) => {
    const { productId } = req.params;
    const product = await productService.getById(productId);
    successResponse(res, product, "Data products berhasil diambil");
});

const createProducts = asyncHandlerv1(async (req, res) => {
    const product = await productService.createNewProduct(req.body);
    successResponse(res, product, "Data products berhasil dibuat", 201);
});

const updateProducts = asyncHandlerv1(async (req, res) => {
    const { productId } = req.params;
    const product = await productService.updateProduct(req.body, productId);
    successResponse(res, product, "Data products berhasil diperbarui");
});

const deleteProductById = asyncHandlerv1(async (req, res) => {
    const { productId } = req.params;
    const deletedProduct = await productService.destroy(productId);
    successResponse(res, deletedProduct, "Data products berhasil dihapus", 200);
});

module.exports = { getProducts, getProductById, createProducts, updateProducts, deleteProductById };
