const express = require('express');
const { getProducts, createProducts, getProductById, deleteProducts, updateProducts } = require('./products.controller');
const router = express();

router.get('/products', getProducts)
router.get('/products/:id', getProductById)
router.post('/products', createProducts)
router.delete('/products/:id', deleteProducts)
router.patch('/products/:id', updateProducts)

module.exports = router