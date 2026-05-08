// routes/user.routes.js
const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { getUsers, getMyProfile, getAllUsers } = require("../controllers/user.controller");
const {authorize} = require('../middlewares/role.middleware')
const router = express.Router();

router.get("/users", protect, getUsers);
router.get("/users/me", protect, getMyProfile);
router.get("/users", protect, authorize("admin"), getAllUsers);

module.exports = router;
