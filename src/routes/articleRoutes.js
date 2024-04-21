const express = require('express');

const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');

// User routes
router.get('/users/me', authMiddleware, userController.getUserInfo);
router.get('/articles', authMiddleware, articleController.getSavedArticles);
router.post('/articles', authMiddleware, articleController.createArticle);
router.delete(
  '/articles/:articleId',
  authMiddleware,
  articleController.deleteArticle,
);

module.exports = router;
