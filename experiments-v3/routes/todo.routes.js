const express = require('express');
const router = express.Router();
const getTodo = require('../controllers/todo.controller');

router.get("/todo", getTodo)

module.exports = router;