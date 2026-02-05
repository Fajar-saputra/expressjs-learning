const express = require("express");
const router = express.Router()

const { getUser, deleteUser, createUser, updateUser } = require("../controllers/user.controller");


router.get("/users", getUser)
router.post("/users", createUser)
router.put("/users/:id", updateUser)
router.delete("/users/:id", deleteUser)

module.exports = router
