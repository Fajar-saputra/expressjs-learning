const express = require('express');
const { getUsers, getUserById, createUser, deleteUserById, deleteAllUsers } = require('../controller/users.controller');
const {validate} = require('../middlewares/validate.middleware')
const {userSchema} = require('../validation/userSchema')
const router = express.Router();


router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/users',validate(userSchema) ,createUser)
router.delete('/users/:id', deleteUserById)
router.delete('/users', deleteAllUsers)


module.exports = router;