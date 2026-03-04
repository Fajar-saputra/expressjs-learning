const express = require("express");
const router = express.Router();
const {articleSchema} = require("../validations/articleValidation")
const {validate} = require("../middlewares/validate")
const { getArticles, createArticles, deleteArticles, updateArticles } = require("../controllers/article.controller");
const { protect } = require("../middlewares/protect");

router.get("/article", getArticles);
router.post("/article" ,validate(articleSchema), createArticles)
// router.post("/article",protect ,validate(articleSchema), createArticles)
router.delete('/article/:id', deleteArticles)
router.patch('/article/:id', updateArticles)
module.exports = router;
