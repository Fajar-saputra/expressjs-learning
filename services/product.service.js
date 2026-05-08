const productRepository = require("../repositories/product.repository");
const { AppError } = require("../utils/AppError");
const path = require("path");
const fs = require("fs");
const { deleteFile } = require("../utils/file");

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

const newProduct = async ({ name, price, category, description, image }) => {
    return await productRepository.create({ name, price, category, description, image });
};

const updateProduct = async (productId, { name, price, category, description, image }) => {
    const product = await productRepository.findById(productId);

    if (!product) {
        throw new Error("Product tidak ditemukan", 404);
    }

    // Hanya hapus gambar lama JIKA ada gambar baru yang diupload
    if (image && product.image) {
        // Gunakan fungsi deleteFile utils yang kita buat tadi agar lebih bersih
        const fileName = product.image.replace("/uploads/", "");
        const oldPath = path.join(__dirname, "..", "uploads", fileName);
        
        await deleteFile(oldPath); 
    }

    // Jalankan update ke database
    await productRepository.update(productId, { name, price, category, description, image });

    // Ambil data terbaru untuk dikembalikan ke user
    return productRepository.findById(productId); 
};

const deleteProduct = async (productId) => {
    await getById(productId);
    return await productRepository.destroy(productId);
};

module.exports = { getAll, getById, newProduct, updateProduct, deleteProduct };
