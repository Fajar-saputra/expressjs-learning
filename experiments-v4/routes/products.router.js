const express = require("express");
const { getProducts, createProducts, getProductById, deleteProducts, updateProducts } = require("../controllers/products.controller");
const validate = require("./validate");
const { schemaProduct } = require("../schema/skemaProducts");
const router = express();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", validate(schemaProduct), createProducts);
router.delete("/products/:id", deleteProducts);
router.patch("/products/:id", updateProducts);

module.exports = router;
