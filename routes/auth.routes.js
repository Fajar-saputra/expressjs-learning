const express = require("express");
const { loginUser, registerUser } = require("../controller/auth.controller");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
