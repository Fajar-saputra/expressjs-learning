const { AppError } = require("../utils/appError");
const productRepository = require("../repositories/products.repository");

const getAll = async (filters = {}) => {
    const result = await productRepository.findAllWithFilters(filters);
    if (result.data.length === 0) {
        throw new AppError("Data product kosong", 404);
    }
    return result;
};

const getById = async (productId) => {
    const product = await productRepository.findById(productId);
    if (!product) {
        throw new AppError("Product tidak ditemukan", 404);
    }
    return product;
};

const createNewProduct = async (productData) => {
    const { name, price, description, category } = productData;

    const product = await productRepository.create(name, price, description, category);

    return product;
};

const updateProduct = async (productData, productId) => {
    const { name, price, description, category } = productData;

    // Cek apakah product ada
    const existingProduct = await productRepository.findById(productId);
    if (!existingProduct) {
        throw new AppError("Product tidak ditemukan", 404);
    }

    const product = await productRepository.update(name, price, description, category, productId);
    return product;
};

const destroy = async (productId) => {
    const product = await productRepository.findById(productId);

    if (!product) {
        throw new AppError("Product tidak ditemukan", 404);
    }

    await productRepository.deleteProduct(productId);
    return true;
};

module.exports = { getAll, getById, createNewProduct, updateProduct, destroy };
