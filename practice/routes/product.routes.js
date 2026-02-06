const express = require("express")

const router = express.Router()

const { getProduct, addProduct } = require('../controller/product.controller');

router.get("/product", getProduct)
router.post("/product", addProduct)


module.exports = router
