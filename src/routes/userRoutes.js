const express = require("express");

const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Proceed with user registration
  },
);

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      email,
      password: hashedPassword,
      name,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/articles/:id", async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }
  res.status(200).json(article);
});
router.delete("/articles/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const article = await Article.findById(id);
  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }
  if (article.userId !== userId) {
    return res
      .status(403)
      .json({ error: "You are not authorized to delete this article" });
  }
  await Article.findByIdAndDelete(id);
  res.status(200).json({ message: "Article deleted successfully" });
});

module.exports = router;
