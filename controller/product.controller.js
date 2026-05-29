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
const productAll = asyncHandler(async (req, res) => {
    const product = await productService.getByAll();
    successResponse(res, product, `Berhasil ambil semua user`);
});

module.exports = { createProduct, productById, productAll };
