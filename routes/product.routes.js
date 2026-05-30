const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth.middleware");
const { createProduct, prodcutAll, productById, deleteProduct, updateProduct } = require("../controller/product.controller");
const { upload } = require("../middleware/upload");
const { validate } = require("../middleware/validation.middleware");
const { paramsId } = require("../validation/schema");

router.get("/products/:productId", validate(paramsId), productById);
router.delete("/products/:productId", protect, authorize("admin"), deleteProduct);
router.patch("/products/:productId", protect, updateProduct);

router.post("/products", upload.single("image"), createProduct);
router.get("/products", protect, authorize("admin"), prodcutAll);

module.exports = router;
