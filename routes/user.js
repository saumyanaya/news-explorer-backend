// Import necessary modules and dependencies
const express = require("express");
const jwt = require("jsonwebtoken");
const middlewares = require("./auth"); // Middleware to check JWT
const bcrypt = require("bcryptjs"); // For hashing passwords

// Import controllers
const UserController = require("./controllers/UserController");
const ArticleController = require("./controllers/ArticleController");

// Create Express router
const router = express.Router();

// Route to register a new user
router.post("/signup", UserController.registerUser);

// Route to authenticate and generate JWT for login
router.post("/signin", UserController.loginUser);

// Define routes

// Route to get information about the logged-in user
router.get("/users/me", middlewares, UserController.getLoggedInUserInfo);

// Route to get data saved by the user
router.get("/articles", middlewares, ArticleController.getSavedArticles);

// Route to create a data object by the user
router.post("/articles", middlewares, ArticleController.createArticle);

// Route to delete the data object created by the user
router.delete(
  "/articles/:articleId",
  middlewares,
  ArticleController.deleteArticle,
);

// Export router
module.exports = router;
