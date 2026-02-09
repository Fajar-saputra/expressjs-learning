const express = require("express")

const router = express.Router()

const {
  getProduct,
  getProductById,
  addProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
} = require("../controller/product.controller");
const validate = require("../middleware/validate.middleware");
const { productSchema } = require("../validation/product.schema");

router.get("/product", getProduct)
router.get("/product/:id", getProductById)
router.post("/product", validate(productSchema), addProduct)
router.put("/product/:id", updateProduct)
router.patch("/product/:id", patchProduct)
router.delete("/product/:id", deleteProduct)


module.exports = router
