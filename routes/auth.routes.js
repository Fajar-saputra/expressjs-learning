const express = require("express");
const { loginUser, registerUser, resetPassoword, logout, updatePassword } = require("../controller/auth.controller");
const { forgotPassword } = require("../services/auth.service");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/reset-password/:token", resetPassoword);
router.get("/logout", logout);
router.post("/update-password",protect, updatePassword);
router.post("/forgot-password", forgotPassword);

module.exports = router;
