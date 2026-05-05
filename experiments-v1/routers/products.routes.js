const express = require('express');
const router = express.Router();

const { validateJoi } = require('../middlewares/validate.middleware');
const upload = require('../middlewares/upload');
const { productsSchema, paramsSchema } = require('../validations/productsSchema');
const {
    getProducts,
    getProductById,
    createProducts,
    deleteProductById,
    updateProducts
} = require('../controllers/products.controller');

// route umum
router.get('/products', getProducts)
router.post('/products', upload.single('image'), validateJoi(productsSchema, 'body'), createProducts)

// route params
router.get('/products/:productId',validateJoi(paramsSchema, 'params')  ,getProductById)
router.patch('/products/:productId', updateProducts)
router.delete('/products/:productId', deleteProductById)

module.exports = router
