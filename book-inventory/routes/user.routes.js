// routes/user.routes.js
const express = require("express");
const {protect} = require('../middlewares/auth.middleware')
const { getUsers } = require("../controllers/user.controller");
const router = express.Router();

router.get("/users",protect, getUsers)
module.exports = router;
