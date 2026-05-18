const express = require("express")
const router = express.Router();
const userController = require('../controller/user.controller')


router.get('/users/:userId', userController.userById)
router.get('/users', userController.userAll)
router.post('/users', userController.createUserByAdmin)

module.exports = router
