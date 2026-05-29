const productRepository = require("../repositories/product.repository");
const bcrypt = require("bcrypt");
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

const updateProduct = async (id, { name, price, image }) => {
    const product = await productRepository.findById(id);

    if (!product) {
        throw new AppError("Product tidak ditemukan", 404);
    }

    // 🔥 HAPUS IMAGE LAMA
    if (image && product.image) {
        const oldPath = path.join(__dirname, "..", product.image);

        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
        }
    }

    const updated = await productRepository.update(
        id,
        name,
        price,
        image
    );

    return updated;
};


module.exports = { getByAll, getById, createProduct, deleteProduct, updateProduct };
