const express = require('express');
const { getProducts, getProductById, createProduct, deleteProduct, updateProduct } = require('../controller/product.controller');
const router = express();

const {validate} = require('../middlewares/validate.middleware')
const {productSchema} = require('../validation/productSchema')


router.get('/product', getProducts)
router.get('/product/:id', getProductById)
router.post('/product', validate(productSchema), createProduct)
router.delete('/product/:id', deleteProduct)
router.patch('/product/:id', updateProduct)

module.exports = router