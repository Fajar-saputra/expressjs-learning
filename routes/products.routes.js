const express = require("express");
const router = express.Router();
const { getProducts, getProductById, createProduct, deleteProduct, updateProduct } = require("../controllers/products.controller");
const upload = require('../middlewares/upload')
const { protect } = require("../middlewares/auth.controller");

// route umum
router.get("/products", protect, getProducts);
router.post("/products",upload.single('image'), createProduct);

// route params
router.get("/products/:productId", getProductById);
router.delete("/products/:productId", deleteProduct);
router.patch("/products/:productId",upload.single('image') ,updateProduct);

module.exports = router;
