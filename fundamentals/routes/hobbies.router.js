const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate");
const { hobbyShcema } = require("../validations/hobbyValidation");

const { getHobbies, getHobbyById, createHobbies, deleteHobbies, updateHobbies } = require("../controllers/hobbies.controller");

router.get("/hobbies", getHobbies);
router.get("/hobbies/:id", getHobbyById);
router.post("/hobbies", validate(hobbyShcema), createHobbies);
router.delete("/hobbies/:id", deleteHobbies);
router.patch("/hobbies/:id", updateHobbies);

module.exports = router;
