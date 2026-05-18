const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth.middleware");
const { createProduct, prodcutAll, productById } = require("../controller/product.controller");
const { upload } = require("../middleware/upload");

router.post(
    "/products",
    upload.single("image"),
    createProducts
);
router.get("/products/:productId", productById);
router.get("/products", protect, authorize("admin"), prodcutAll);

module.exports = router;
