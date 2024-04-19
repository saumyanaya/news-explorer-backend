const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const authMiddleware = require("../middleware/authMiddleware");

// Get all articles saved by the user
router.get("/", authMiddleware, articleController.getAllArticles);

// Create an article
router.post("/", authMiddleware, articleController.createArticle);

// Delete an article by ID
router.delete("/:articleId", authMiddleware, articleController.deleteArticle);

module.exports = router;
