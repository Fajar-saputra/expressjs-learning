const express = require("express");
const { loginUser, registerUser, logoutUser, updatePassword, forgotPassowrd, resetPassword } = require("../controller/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", protect, logoutUser);
router.post("/update-password", protect, updatePassword);
router.post("/forgot-password", forgotPassowrd);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
