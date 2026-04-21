const express = require("express");
const router = express();
const { getProducts, createProducts, getProductById, deleteProducts, updateProducts } = require("../controllers/products.controller");
const {validate} = require("../middlewares/validate.middleware");
const { schemaProduct } = require("../schema/skemaProducts");

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", validate(schemaProduct), createProducts);
router.delete("/products/:id", deleteProducts);
router.patch("/products/:id", updateProducts);

module.exports = router;
