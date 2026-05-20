const express = require("express");
const { loginUser, registerUser, resetPassoword, logout, updatePassword } = require("../controller/auth.controller");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post('/reset-password', resetPassoword)
router.get('/logout', logout)
router.post('/update-password', updatePassword)
router.post(
    "/forgot-password",
    forgotPassword
);

module.exports = router;
