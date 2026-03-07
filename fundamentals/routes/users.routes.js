const express = require("express");
const router = express.Router();
const {validate} = require("../middlewares/validate");
const anggotaSchema = require("../validations/anggotaSchema")
const { getAllUsers, getUserById, createUser, deleteUser, updateUser } = require("../controllers/users.controller");

router.get("/users", getAllUsers);
router.get("/users/:id",validate(anggotaSchema.idParam) ,getUserById);
router.post("/users",validate(anggotaSchema.create) ,createUser);
router.patch("/users/:id",validate(anggotaSchema.idParam), validate(anggotaSchema.update), updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
