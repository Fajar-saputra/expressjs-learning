const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const {usersSchema} = require('../validations/usersValidation')
const {validate} = require('../middlewares/validate.middleware')

// endpoint auth
router.post("/register",validate(usersSchema) ,register);
router.post("/login", login);

module.exports = router;