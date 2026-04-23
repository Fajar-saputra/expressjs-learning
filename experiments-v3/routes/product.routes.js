const express = require("express");
const router = express.Router();
const { getProducts, createProducts, getProductByID, deleteProductByID, updateProduct } = require("../controllers/products.controller");
const { schemaProduct, schemaParams } = require("../schema/schema");
const { validate } = require("../middlewares/validate.middleware");

router.get("/products", getProducts);
router.get("/products/:id", validate(schemaParams, "params"), getProductByID);
router.post("/products", validate(schemaProduct, "body"), createProducts);
router.patch("/products/:id",
    validate(schemaParams, "params"),
    validate(schemaProduct, 'body'),
    updateProduct);
router.delete("/products/:id", validate(schemaParams, "params"), deleteProductByID);

module.exports = router;
