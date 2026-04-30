const express = require("express");
const router = express();
const { validate } = require("../middlewares/validate.middleware");
const { schemaProduct } = require("../schema/skemaProducts");

const { getProducts, getProductById, createProduct, deleteProduct, updateProduct } = require("../controllers/products.controller");

// route umum
router.get("/products", getProducts);
router.post("/products", validate(schemaProduct), createProduct);

// route params
router.get("/products/:productId", getProductById);
router.delete("/products/:productId", deleteProduct);
router.patch("/products/:productId", updateProduct);

module.exports = router;
