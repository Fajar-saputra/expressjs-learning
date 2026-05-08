const express = require("express");
const { getProducts, getProductById, createProduct, deleteProduct, updateProduct } = require("../controller/product.controller");
const router = express.Router();

const { validate } = require("../middlewares/validate.middleware");
const { productSchema } = require("../validation/productSchema");
const { protect } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/upload");

router.get("/products",protect ,getProducts);
router.get("/products/:productId", getProductById);
router.post('/:productId', upload.single('image'), createProduct);
// router.post('/:productId', upload.single('image'), validate(productSchema), createProduct);
router.delete("/products/:productId", deleteProduct);
router.patch("/products/:productId",upload.single('image') ,updateProduct);

module.exports = router;
