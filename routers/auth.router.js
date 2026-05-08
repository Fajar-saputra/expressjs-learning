const express = require("express");
const router = express.Router();
const { register, login, getMeController } = require("../controllers/auth.controller");
const { validateZod } = require('../middlewares/validate.middleware')
const { usersSchema } = require('../validations/usersSchema');
const { protect } = require("../middlewares/protect");


// endpoint auth
router.get("/me", protect, getMeController);
router.post("/register",validateZod(usersSchema) ,register);
router.post("/login", login);

module.exports = router;