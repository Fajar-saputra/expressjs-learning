const express = require('express');
const { getUser, getUsers, createUser, updateUserByAdmin, deleteUser, getMeByUser } = require('../controllers/users.controller');
const { protect } = require('../services/auth.service');
const router = express.Router();

router.get('/me',protect,  getMeByUser)
router.get('/users', getUser)
router.get('/users/userId', getUsers)
router.post('/users', createUser)
router.patch('/users', updateUserByAdmin)
router.patch('/users', deleteUser)

module.exports = router