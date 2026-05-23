const express = require("express");
const { loginUser, registerUser, logout, updatePassword, resetPassword, forgotPassword } = require("../controller/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validation.middleware");
const { loginSchema } = require("../validation/schema");
const router = express.Router();

router.post("/login",validate(loginSchema) ,loginUser);
router.post("/register", registerUser);
router.get("/logout", logout);
router.post("/update-password",protect, updatePassword);
router.post("/reset-password/:token", resetPassword);
router.post("/forgot-password", forgotPassword);

module.exports = router;
