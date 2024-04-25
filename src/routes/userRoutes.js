const express = require("express");

const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const userController = require("../controllers/userController");

// Route to get information about the logged-in user
router.get("/users/me", authMiddleware, userController.getUserInfo);

module.exports = router;
