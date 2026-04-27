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

const newCreateProduct = async (productData) => {
    console.log(productData);
    const { name, price, category, description } = productData;

    const product = await productRepository.create(name, price, category, description);

    return product;
};

const updateProduct = async (productData, productId) => {
    const { name, price, category, description } = productData;

    const product = await productRepository.update(name, price, category, description, productId);

    if (!product) {
        throw new AppError("product tidak ditemukan", 404);
    }

    return product;
};

const destroy = async (productId) => {
    const product = await productRepository.deleteProduct(productId);
    return product;
};

module.exports = { getAll, getById, newCreateProduct, updateProduct, destroy };
