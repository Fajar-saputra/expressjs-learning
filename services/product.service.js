// const fs = require("fs").promises;
const fs = require("fs");
const path = require("path");
const { AppError } = require("../utils/AppError");
const productRepository = require("../repositories/product.repository");

const getAll = async (filters = {}) => {
    const products = await productRepository.findAllWithFilters(filters);

    if (products.rows.length === 0) {
        throw new AppError("Data product kosong", 404);
    }

    return products;
};

const getById = async (productId) => {
    const product = await productRepository.findById(productId);
    if (!product) {
        throw new AppError("product tidak ditemukan", 404);
    }

    return product;
};

const newCreateProduct = async ({ name, price, category, description, image }) => {
    return await productRepository.create({ name, price, category, description, image });
};

const updateProduct = async (productId, { name, price, category, description, image }) => {
    const product = await productRepository.findById(productId);

    if (!product) {
        throw new AppError("product tidak ditemukan", 404);
    }

    if (image && product.image) {
        const filename = product.image.replace("/uploads/", "");
        const oldPath = path.join(__dirname, "..", filename);

        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
        }
    }

    const update = await productRepository.update(productId, { name, price, category, description, image });

    return update;
};

const destroy = async (productId) => {
    const product = await productRepository.deleteProduct(productId);
    return product;
};

module.exports = { getAll, getById, newCreateProduct, updateProduct, destroy };
