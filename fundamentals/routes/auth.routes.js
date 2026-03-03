const express = require('express')
const router = express()
const { login, register } = require('../controllers/auth.controller')

router.post('/auth/login', login)
router.post('/auth/register', register)

module.exports = router
