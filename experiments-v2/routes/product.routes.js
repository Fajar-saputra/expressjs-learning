const express = require('express');
const { getProducts, getProductById, createProduct, deleteProduct, updateProduct } = require('../controller/product.controller');
const router = express();

const {validate} = require('../middlewares/validate.middleware')
const {productSchema} = require('../validation/productSchema')


router.get('/products', getProducts)     
router.get('/products/:id', getProductById)
router.post('/products', validate(productSchema), createProduct)
router.delete('/products/:id', deleteProduct)
router.patch('/products/:id', updateProduct)

module.exports = router