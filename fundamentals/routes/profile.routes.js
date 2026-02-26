const express = require("express");
const router = express.Router()

const { getProfiles, createProfiles} = require("../controllers/profile.controller")


router.get("/profile", getProfiles)
router.post("/profile", createProfiles)


module.exports = router;
