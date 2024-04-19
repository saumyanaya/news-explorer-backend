const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');

// User registration
router.post('/signup', authController.signup);

// User login
router.post('/signin', authController.signin);

module.exports = router;
