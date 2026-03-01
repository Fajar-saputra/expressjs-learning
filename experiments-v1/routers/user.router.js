const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const { usersSchema } = require("../validations/usersValidation");

const { getUsers, createUsers, getUserById, deleteUser, updateUser } = require("../controllers/user.controller");

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", validate(usersSchema), createUsers);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
