const express = require("express");
const router = express.Router()

const { getProfile, createProfile, updateProfile, deleteProfile } = require("../controllers/profile.controller")


router.get("/profile", getProfile)
router.post("/profile", createProfile)
router.put("/profile/:id", updateProfile)
router.delete("/profile/:id", deleteProfile)


module.exports = router;
