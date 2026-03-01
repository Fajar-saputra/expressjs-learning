const express = require("express");
const router = express.Router();
const {articleSchema} = require("../validations/articleValidation")
const {validate} = require("../middlewares/validate")
const { getArticles, createArticles, deleteArticles, updateArticles } = require("../controllers/article.controller");

router.get("/article", getArticles);
router.post("/article",validate(articleSchema), createArticles)
router.delete('/article/:id', deleteArticles)
router.patch('/article/:id', updateArticles)
module.exports = router;
