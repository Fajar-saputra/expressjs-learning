const express = require("express");
const router = express.Router();
const { validateZod } = require("../middlewares/validate.middleware");
const { usersSchema } = require("../validations/usersSchema");

const { getUsers, createUsers, getUserById, deleteUser, updateUser } = require("../controllers/user.controller");

router.get("/users", getUsers);
router.get("/users/:productId", getUserById);
router.post("/users", validateZod(usersSchema), createUsers);
router.patch("/users/:productId", updateUser);
router.delete("/users/:productId", deleteUser);

module.exports = router;
