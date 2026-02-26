const express = require("express");
const router = express.Router();
const { getArticles, createArticles, deleteArticles, updateArticles } = require("../controllers/article.controller");

router.get("/article", getArticles);
router.post("/article", createArticles)
router.delete('/article/:id', deleteArticles)
router.patch('/article/:id', updateArticles)
module.exports = router;
