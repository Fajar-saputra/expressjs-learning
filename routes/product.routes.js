const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth.middleware");
const { createProduct, productAll, productById, deleteProduct, updateProduct } = require("../controller/product.controller");
const { upload } = require("../middleware/upload");

router.post("/products", upload.single("image"), createProduct);
router.get("/products/:productId", productById);
router.get("/products", protect, authorize("admin"), productAll);
router.get("/products/:productId", protect, authorize("admin"), deleteProduct);
router.patch("/product/:productId", protect, updateProduct)

module.exports = router;
