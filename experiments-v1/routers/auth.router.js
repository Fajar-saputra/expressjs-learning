const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const { validateZod } = require('../middlewares/validate.middleware')
const { usersSchema } = require('../validations/usersSchema')


// endpoint auth
router.post("/register",validateZod(usersSchema) ,register);
router.post("/login", login);

module.exports = router;