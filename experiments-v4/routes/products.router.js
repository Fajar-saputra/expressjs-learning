const express = require("express");
const router = express();
const {validate} = require("../middlewares/validate.middleware");
const { schemaProduct } = require("../schema/skemaProducts");

const {
    getProducts,
    createProducts,
    getProductById,
    deleteProducts,
    updateProducts
} = require("../controllers/products.controller");
const { getProductPagination } = require("../controllers/product.services");


// pagination
router.get("/products/pagination", getProductPagination)

// route umum
router.get("/products", getProducts);
router.post("/products", validate(schemaProduct), createProducts);

// route params
router.get("/products/:productId", getProductById);
router.delete("/products/:productId", deleteProducts);
router.patch("/products/:productId", updateProducts);

module.exports = router;
