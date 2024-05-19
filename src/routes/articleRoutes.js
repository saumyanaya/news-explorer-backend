const express = require("express");

const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const articleController = require("../controllers/articleController");
const {
  validateCreateArticle,
  validateId,
} = require("../../middleware/validation");

// User routes
router.get("/articles", authMiddleware, articleController.getSavedArticles);
router.post(
  "/articles",
  authMiddleware,
  articleController.createArticle,
  validateCreateArticle,
);
router.delete(
  "/articles/:articleId",
  authMiddleware,
  articleController.deleteArticle,
  validateId,
);

module.exports = router;
