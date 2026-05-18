const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

router.get("/users/:userId", userController.userById);
router.get("/users", protect, authorize("admin"), userController.userAll);
router.post("/users", userController.createUserByAdmin);

module.exports = router;
