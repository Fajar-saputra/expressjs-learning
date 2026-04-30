const productRepository = require("../repositories/product.repository");
const { AppError } = require("../utils/AppError");

const getProducts = async (filters = {}) => {
    const products = await productRepository.findAllWithFilters(filters);
    if (!products) {
        throw new AppError("Product masih kosong!", 404);
    }
    return products;
};

const getProductById = async (productId) => {
    const product = await productRepository.findById(productId);
    if (!product) throw new AppError("Product tidak ditemukan!", 404);
    return product;
};

    const createNewProduct = async (productData) => {
        return await productRepository.create(productData);
    };

module.exports = { getProducts, getProductById, createNewProduct };
