const productRepository = require("../repositories/product.repository");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const { appError } = require("../utils/appError");

const getByAll = async () => {
    return productRepository.findAll();
};

const getById = async (productId) => {
    return productRepository.findById(productId);
};

const createProduct = async ({ name, category, description, price, image }) => {
    const productExists = await productRepository.findByName(name);
    if (productExists) throw new appError("Product sudah ada!", 400);

    await productRepository.create({ name, category, description, price, image });

    return { name, category, description, price, image };
};

const deleteProduct = async (productId) => {
    return productRepository.destroy(productId);
};

const updateProduct = async (productId, { name, category, description, price, image }) => {
    // ambil product by id
    const product = await productRepository.findById(productId);
    if (!product) throw new appError(`Product dengan ID ${productId} tidak ditemuka`, 404);

    // hapus image lama
    if (image && product.image) {
        const oldPath = path.join(__dirname, "..", product.image);

        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const updated = await productRepository.update(productId, { name, category, description, price, image });

    return updated;
};

module.exports = { getByAll, getById, createProduct, deleteProduct, updateProduct };
