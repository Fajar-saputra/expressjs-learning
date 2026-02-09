const express = require('express');
const { getUsers, getUserById, createUser, deleteUserById, deleteUsers } = require('../controller/users.controller');

const router = express.Router();


router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/users', createUser)
router.delete('/users/:id', deleteUserById)
router.delete('/users', deleteUsers)


module.exports = router;