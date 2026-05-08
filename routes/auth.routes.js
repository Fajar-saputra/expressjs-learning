const express = require('express')
const router = express()

const {register, login, getMeController} = require('../controller/auth.controller');
const { protect } = require('../middlewares/auth.middleware');


router.get("/me", protect, getMeController);
router.post('/login', login)
router.post('/register', register)


module.exports = router;