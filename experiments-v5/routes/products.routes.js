const express = require("express");
const router = express.Router();
const { getProducts, getProductById, createProduct, deleteProduct, updateProduct } = require("../controllers/products.controller");

const { protect } = require("../middlewares/auth.controller");

// route umum
router.get("/products", protect, getProducts);
router.post("/products", createProduct);

// route params
router.get("/products/:productId", getProductById);
router.delete("/products/:productId", deleteProduct);
router.patch("/products/:productId", updateProduct);

module.exports = router;
