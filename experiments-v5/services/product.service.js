const productRepository = require("../repositories/product.repository");
const { AppError } = require("../utils/AppError");

const getAll = async (reqQuery) => {
    const products = await productRepository.findAll(reqQuery);
    if (!products) throw new AppError("Product kosong", 404);
    return products;
};

const getById = async (productId) => {
    const product = await productRepository.findById(productId);
    if (!product) throw new AppError("Product tidak ditemukan!", 404);
    return product;
};

const newProduct = async (productData) => {
    return await productRepository.create(productData);
};

const updateProduct = async (productData, productId) => {
    const product = await productRepository.update(productData, productId);

    return getById(productId);
};

const deleteProduct = async (productId) => {
    await getById(productId)
    return await productRepository.destroy(productId)
};

module.exports = { getAll, getById, newProduct, updateProduct, deleteProduct };
