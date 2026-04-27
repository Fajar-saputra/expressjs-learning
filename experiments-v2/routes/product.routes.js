const express = require("express");
const { getProducts, getProductById, createProduct, deleteProduct, updateProduct } = require("../controller/product.controller");
const router = express.Router();

const { validate } = require("../middlewares/validate.middleware");
const { productSchema } = require("../validation/productSchema");

router.get("/products", getProducts);
router.get("/products/:productId", getProductById);
router.post("/products", validate(productSchema), createProduct);
router.delete("/products/:productId", deleteProduct);
router.patch("/products/:productId", updateProduct);

module.exports = router;
