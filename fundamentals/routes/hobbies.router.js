const express = require('express')
const router = express.Router();

const { getHobbies, getHobbyById, createHobbies, deleteHobbies, updateHobbies } = require("../controllers/hobbies.controller")

router.get("/hobbies", getHobbies)
router.get("/hobbies/:id", getHobbyById)
router.post('/hobbies', createHobbies)
// router.delete('/hobbies/:id', deleteHobbies)
// router.patch('/hobbies/:id', updateHobbies)

module.exports = router