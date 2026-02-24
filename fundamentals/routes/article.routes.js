const express = require("express");
const router = express.Router();
const { getArtile, createArticle, deleteArticle, updateArticle } = require("../controllers/article.controller");

router.get("/article", getArtile);
router.post("/article", createArticle);
router.delete("/article/:id", deleteArticle);
router.put("/article/:id", updateArticle);

module.exports = router;
    