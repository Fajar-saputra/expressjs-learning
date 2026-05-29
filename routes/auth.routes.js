const express = require("express");
const { loginUser, registerUser, logoutUser, updatePassword } = require("../controller/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", protect, logoutUser);
router.post("/update-password", protect, updatePassword);

module.exports = router;
