const { asyncHandlerv2 } = require("../utils/asyncHandler");
const { successRespon } = require("../utils/respon");

const productService = require("../services/product.service");

const getProducts = asyncHandlerv2(async (req, res) => {
    const product = await productService.getAll();
    successRespon(res, product, "Data product berhasil diambil");
});

const getProductById = asyncHandlerv2(async (req, res) => {
    const { productId } = req.params;
    const product = await productService.getById(productId);
    successRespon(res, product, "Data product berhasil diambil");
});

const createProduct = asyncHandlerv2(async (req, res) => {
    const product = await productService.newCreateProduct(req.body);
    successRespon(res, product, "Data product berhasil ditambah", 201);
});

const deleteProduct = asyncHandlerv2(async (req, res) => {
    const { productId } = req.params;
    const product = await productService.destroy(productId);
    successRespon(res, product, "Data product berhasil dihapus");
});

const updateProduct = asyncHandlerv2(async (req, res) => {
    const { productId } = req.params;
    const product = await productService.updateProduct(req.body, productId);
    successRespon(res, product, "Data product berhasil diupdate");
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
