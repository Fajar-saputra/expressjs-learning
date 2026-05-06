const express = require('express');
const { getUser, getUsers, createUser, updateUserByAdmin, deleteUser } = require('../controllers/users.controller');
const router = express.Router();

router.get('/users', getUser)
router.get('/users/userId', getUsers)
router.post('/users', createUser)
router.patch('/users', updateUserByAdmin)
router.patch('/users', deleteUser)

module.exports = router