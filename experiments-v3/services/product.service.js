const productRepository = require("../repositories/product.repository");
const { AppError } = require("../utils/appError");

const getAllWithFilters = async (filters) => {
    const result = await productRepository.findAllWithFilters(filters);
    // Jika rows kosong, biasanya tidak 404 (cukup return array kosong), 
    // tergantung ingin throw error:
    if (!result.rows.length && filters.search) {
        throw new AppError("Produk tidak ditemukan dengan filter tersebut", 404);
    }
    return result;
};

const getById = async (id) => {
    const product = await productRepository.findById(id);
    if (!product) throw new AppError("Produk tidak ditemukan!", 404);
    return product;
};

const createNewProducts = async (productData) => {
    return await productRepository.create(productData);
};

const updateProduct = async (id, productData) => {
    const product = await getById(id);
    return await productRepository.update(id, productData);
};

const deleteProduct = async (id) => {
    await getById(id);
    return await productRepository.destroy(id);
};

module.exports = { getAllWithFilters, getById, createNewProducts, updateProduct, deleteProduct };