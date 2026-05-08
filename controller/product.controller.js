const { asyncHandlerv2 } = require("../utils/asyncHandler");
const { successResponse } = require("../utils/response");

const productService = require("../services/product.service");

const getProducts = asyncHandlerv2(async (req, res) => {
    const { page, limit, search, minPrice, maxPrice, category } = req.query;

    const filters = {
        page: 1,
        limit: 10,
        search,
        minPrice: minPrice ? parseInt(minPrice) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
        category,
    };

    const product = await productService.getAll(filters);

    successResponse(res, product, "Data product berhasil diambil");
});

const getProductById = asyncHandlerv2(async (req, res) => {
    const { productId } = req.params;
    const product = await productService.getById(productId);
    successResponse(res, product, "Data product berhasil diambil");
});

const createProduct = asyncHandlerv2(async (req, res) => {
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const { name, price, category, description } = req.body;
    const product = await productService.newCreateProduct({ name, price, category, description, image });
    successResponse(res, product, "Data product berhasil ditambah", 201);
});

const deleteProduct = asyncHandlerv2(async (req, res) => {
    const { productId } = req.params;
    const product = await productService.destroy(productId);
    successResponse(res, product, "Data product berhasil dihapus");
});

const updateProduct = asyncHandlerv2(async (req, res) => {
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const { name, price, category, description } = req.body;

    const product = await productService.updateProduct(req.params.productId, { name, price, category, description, image });
    successResponse(res, product, "Data product berhasil diupdate");
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
