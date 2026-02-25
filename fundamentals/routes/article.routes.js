const express = require("express");
const router = express.Router();
const { getArticles, createArticles } = require("../controllers/article.controller");

router.get("/article", getArticles);
router.post("/article", createArticles)
module.exports = router;
