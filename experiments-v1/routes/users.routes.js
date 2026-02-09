const express = require("express");

const router = express.Router();

const { getUsers, createUsers, getUsersById, deleteUsers } = require("../controller/users.controller");
const validate = require("../middleware/validate.middleware");
const { productSchema } = require("../validation/product.schema");

router.get("/users", getUsers);
router.get("/users/:id", getUsersById);
router.post("/users", createUsers)
router.delete("/users/:id", deleteUsers)

module.exports = router;
