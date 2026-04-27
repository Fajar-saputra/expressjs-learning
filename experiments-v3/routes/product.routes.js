const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const { getProducts, createProducts, getProductByID, deleteProductByID, updateProduct } = require("../controllers/products.controller");
const { schemaProduct, schemaParams } = require("../schema/schema");


// route umum
router.get("/products", getProducts);
router.post("/products", validate(schemaProduct, "body"), createProducts);

// route dengnan parameter
router.get("/products/:productId", validate(schemaParams, "params"), getProductByID);
router.delete("/products/:productId", validate(schemaParams, "params"), deleteProductByID);
router.patch("/products/:productId", validate(schemaParams, "params"), validate(schemaProduct, "body"), updateProduct);

module.exports = router;
