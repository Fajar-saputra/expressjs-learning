const { AppError } = require("../utils/appError");
const productRepository = require("../repositories/products.repository");

const getAll = async () => {
    const products = await productRepository.findAll();
    return products;
};

const getById = async (productId) => {
    const product = await productRepository.findById(productId);
    if (!product) {
        throw new Error("Product tidak ditemukan", 404);
    }
    return product;
};

const createNewProduct = async (productData) => {
    const { name, price, description, category } = productData;

    const product = await productRepository.create(name, price, description, category);

    return product;
};

const updateProduct = async (productData) => {
    const { name, price, description, category } = productData;
    
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
