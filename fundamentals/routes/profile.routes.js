const express = require("express");
const router = express.Router()

const { getProfiles, createProfiles, deleteProfiles, updateProfiles} = require("../controllers/profile.controller")


router.get("/profile", getProfiles)
router.post("/profile", createProfiles)
router.delete("/profile/:id", deleteProfiles)
router.patch("/profile/:id", updateProfiles)


module.exports = router;
