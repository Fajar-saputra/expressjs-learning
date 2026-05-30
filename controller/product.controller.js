const productService = require("../services/product.service");
const { asyncHandler } = require("../utils/asyncHandler");
const { successResponse } = require("../utils/successResponse");

const createProduct = asyncHandler(async (req, res) => {
    const { name, category, description, price } = req.body;

    if (!req.file) {
        throw new appError("Gambar produk belum dipilih", 400);
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const product = await productService.createProduct({
        name,
        category,
        description,
        price,
        image: imagePath,
    });

    successResponse(res, product, "Berhasil create product baru", 201);
});

const productById = asyncHandler(async (req, res) => {
    const product = await productService.getById(req.params.productId);
    successResponse(res, product, `Berhasil user ID ${product.id}`);
});
const prodcutAll = asyncHandler(async (req, res) => {
    const product = await productService.getByAll();
    successResponse(res, product, `Berhasil ambil semua user`);
});

const updateProduct = asyncHandler(async (req, res) => {
    // ambil data dari req body
    const { name, category, description, price } = req.body;
    const { productId } = req.params;

    // cek gambar ada atau tidak
    let imagePath;
    if (req.file) imagePath = `/uploads/${req.file.filename}`;

    // kirim data product
    const product = await productService.updateProduct(productId, {
        name,
        category,
        description,
        price,
        image: imagePath,
    });

    successResponse(res, prodcut, "Berhasil update data product");
});

const deleteProduct = asyncHandler(async (req, res) => {
    const user = await productService.deleteProduct(req.params.productId);
    successResponse(res, user, `Berhasil delete product ID ${req.params.productId}`);
});

module.exports = { createProduct, productById, prodcutAll, deleteProduct, updateProduct };
