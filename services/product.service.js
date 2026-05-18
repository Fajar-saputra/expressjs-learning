const productRepository = require("../repositories/product.repository");
const bcrypt = require("bcrypt");
const { appError } = require("../utils/appError");

const getByAll = async () => {
    return productRepository.findAll();
};

const getById = async (productId) => {
    return productRepository.findById(productId);
};

const createProduct = async (productId, { name, category, description, price, image }) => {
    const product = await productRepository.findById(productId);
    if (product) throw new appError("Product sudah ada!", 400);

    await productRepository.create({ name, category, description, price, image });

    return { name, category, description, price, image };
};

const deleteProduct = async (productId) => {
    return productRepository.destroy(productId);
};

const updateProduct = async (productId, { name, category, description, price, image }) => {
    const [result] = await productRepository.update(productId, { name, category, description, price, image });
};

module.exports = { getByAll, getById, createProduct, deleteProduct, updateProduct };
