const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
} = require("../services/product.service");

exports.getProduct = asyncHandler(async (req, res) => {
  const products = await getAllProducts();
  res.status(200).json({ success: true, data: products });
});

exports.getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);

  if (!product) {
    throw new AppError("Product tidak ditemukan", 404);
  }

  res.status(200).json({ success: true, data: product });
});

exports.addProduct = asyncHandler(async (req, res) => {
  const created = await createProduct(req.body);
  res.status(201).json({
    success: true,
    message: "Product berhasil ditambahkan!!",
    data: created,
  });
});

// Tambahkan asyncHandler agar konsisten dengan addProduct
exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const affected = await updateProduct(id, req.body);

  if (!affected) {
    throw new AppError("Product tidak ditemukan", 404);
  }

  res.status(200).json({
    success: true,
    message: `Product dengan ID ${id} berhasil diperbarui`,
  });
});

exports.patchProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const affected = await patchProduct(id, req.body);

  if (!affected) {
    throw new AppError("Product tidak ditemukan atau body kosong", 404);
  }

  res.status(200).json({
    success: true,
    message: `Product dengan ID ${id} berhasil diubah sebagian`,
  });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const affected = await deleteProduct(id);

  if (!affected) {
    throw new AppError("Product tidak ditemukan", 404);
  }

  res.status(204).send();
});
