const express = require("express");
const router = express.Router()

const { getProfiles, createProfiles, deleteProfiles} = require("../controllers/profile.controller")


router.get("/profile", getProfiles)
router.post("/profile", createProfiles)
router.delete("/profile/:id", deleteProfiles)


module.exports = router;
