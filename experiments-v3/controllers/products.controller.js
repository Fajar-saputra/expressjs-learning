const productService = require("../services/product.service");
const { asyncHandlerv1 } = require("../utils/asyncHandler");
const { successResponse } = require("../utils/response");

const getProducts = asyncHandlerv1(async (req, res) => {
    const filters = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        search: req.query.search,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
        category: req.query.category,
    };

    const data = await productService.getAllWithFilters(filters);
    successResponse(res, data, "Berhasil mengambil data produk");
});

const getProductByID = asyncHandlerv1(async (req, res) => {
    const product = await productService.getById(req.params.productId);
    successResponse(res, product, "Berhasil mengambil detail produk");
});

const createProducts = asyncHandlerv1(async (req, res) => {
    const product = await productService.createNewProducts(req.body);
    successResponse(res, product, "Produk berhasil ditambahkan", 201);
});

const updateProduct = asyncHandlerv1(async (req, res) => {
    const product = await productService.updateProduct(req.params.productId, req.body);
    successResponse(res, product, "Produk berhasil diperbarui");
});

const deleteProductByID = asyncHandlerv1(async (req, res) => {
    await productService.deleteProduct(req.params.productId);
    successResponse(res, null, "Produk berhasil dihapus");
});

module.exports = { getProducts, createProducts, getProductByID, deleteProductByID, updateProduct };