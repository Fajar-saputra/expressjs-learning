const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, deleteProduct, updateProduct } = require('../controllers/product.controller');


router.get('/products', getProducts)
router.get('/products/:id', getProductById)
router.post('/products', createProduct)
router.delete('/products/:id', deleteProduct)
router.patch('/products/:id', updateProduct)

module.exports = router