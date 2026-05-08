const express = require('express');
const { getUser, getUsers, createUser, updateUserByAdmin, deleteUser, getMeByUser } = require('../controllers/users.controller');
const { protect, authorize } = require('../services/auth.service');
const router = express.Router();

router.get('/me',protect, authorize('user') ,getMeByUser)
router.get('/users', getUser)
router.get('/users/userId', getUsers)
router.post('/users', createUser)
router.patch('/users', updateUserByAdmin)
router.patch('/users', deleteUser)

module.exports = router