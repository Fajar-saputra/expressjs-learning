const prodcutService = require("../services/product.service");
const { asyncHandler } = require("../utils/asyncHandler");
const { successResponse } = require("../utils/successResponse");

const createProduct = asyncHandler(async (req, res) => {
    const { name, category, description, price } = req.body;
    let imagePath = null;
    if (req.file) {
         imagePath = `/uploads${req.file.filename}`;
    }

    const product = await prodcutService.createProduct({ name, category, description, price, image = imagePath });
    successResponse(res, product, "Berhasil create prodcut baru", 201);
});

const productById = asyncHandler(async (req, res) => {
    const product = await prodcutService.getById(req.params.productId);
    successResponse(res, product, `Berhasil user ID ${product.id}`);
});
const prodcutAll = asyncHandler(async (req, res) => {
    const product = await prodcutService.getByAll();
    successResponse(res, product, `Berhasil ambil semua user`);
});

module.exports = { createProduct, productById, prodcutAll };
