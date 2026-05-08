const { db } = require("../config/db");
const { AppError } = require("../utils/AppError");
const { asyncHandlerv1 } = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");

const productService = require("../services/product.service");

const getProducts = asyncHandlerv1(async (req, res) => {
    const product = await productService.getAll(req.query);
    successResponse(res, product, "Data Product berhasil diambil");
});

const getProductById = asyncHandlerv1(async (req, res) => {
    const product = productService.getById(req.params.productId);
    successResponse(res, product, "Product berhasil ditemukan");    
});

const createProduct = asyncHandlerv1(async (req, res) => {
    const product =await productService.newProduct(req.body);
    successResponse(res, product, "Product berhasil dibuat", 201);
});

const deleteProduct = asyncHandlerv1(async (req, res) => {
    const product = await productService.deleteProduct(req.params.productId);
    successResponse(res, product, "Product berhasil dihapus");
});

const updateProduct = asyncHandlerv1(async (req, res) => {
    const product = await productService.updateProduct(req.body, req.params.productId);
    successResponse(res, product, "Product berhasil diupdate", 200);
});

module.exports = { getProductById, getProducts, createProduct, updateProduct, deleteProduct };
