const express = require("express");
const router = express();
const { getAllUsers, getUserById, createUser, deleteUser, updateUser } = require("../controllers/users.controller");

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
