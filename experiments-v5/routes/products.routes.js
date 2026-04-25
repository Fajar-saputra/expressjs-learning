const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/products.controller');
const {
    getPagination
} = require('../controllers/products.pagination');

// pagination
router.get('/products/pagination', getPagination)

// route umum
router.get('/products', getProducts)
router.post('/products', createProduct)

// route params
router.get('/products/:id', getProductById)
router.delete('/products/:id', deleteProduct)
router.patch('/products/:id', updateProduct)

module.exports = router