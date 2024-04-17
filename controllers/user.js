// Import necessary modules and dependencies
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// // Simulated user data (replace with your actual data storage mechanism)
// const users = [{ id: 1, email: "user@example.com", name: "User" }];

// const articles = []; // Array to store saved articles

// // Controller for getting information about the logged-in user
// exports.getLoggedInUserInfo = (req, res) => {
//   // Extract user information from JWT payload
//   const { userId } = req.user;

//   // Find user by userId
//   const user = users.find((user) => user.id === userId);

//   // Return user information
//   res.json({ email: user.email, name: user.name });
// };

// // Controller for getting data saved by the user
// exports.getSavedArticles = (req, res) => {
//   // You may fetch articles associated with the logged-in user from your database
//   res.json(articles);
// };

// // Controller for creating a data object by the user
// exports.createArticle = (req, res) => {
//   // Extract article data from request body
//   const { keyword, title, text, date, source, link, image } = req.body;

//   // Create new article object
//   const newArticle = { keyword, title, text, date, source, link, image };

//   // Push the new article into the articles array
//   articles.push(newArticle);

//   // Return success response
//   res
//     .status(201)
//     .json({ message: "Article created successfully", article: newArticle });
// };

// // Controller for deleting the data object created by the user
// exports.deleteArticle = (req, res) => {
//   // Extract articleId from request parameters
//   const { articleId } = req.params;

//   // Find index of the article with given articleId
//   const index = articles.findIndex((article) => article._id === articleId);

//   // If article not found, return 404
//   if (index === -1) {
//     return res.status(404).json({ message: "Article not found" });
//   }

//   // Remove article from the articles array
//   articles.splice(index, 1);

//   // Return success response
//   res.json({ message: "Article deleted successfully" });
// };

// Simulated user data (replace with your actual data storage mechanism)
const users = [];

// Controller for registering a new user
exports.registerUser = (req, res) => {
  // Extract user data from request body
  const { email, password, name } = req.body;

  // Check if email is already registered
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "Email already registered" });
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create new user object
  const newUser = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    name,
  };

  // Add the new user to the users array
  users.push(newUser);

  // Return success response
  res.status(201).json({ message: "User registered successfully" });
};

// Controller for logging in a user
exports.loginUser = (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Find user by email
  const user = users.find((user) => user.email === email);

  // If user not found or password is incorrect, return 401 Unauthorized
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Return JWT token in response
  res.json({ token });
};

// Controller for getting information about the logged-in user
exports.getLoggedInUserInfo = (req, res) => {
  // Extract user information from JWT payload
  const { userId } = req.user;

  // Find user by userId
  const user = users.find((user) => user.id === userId);

  // Return user information
  res.json({ email: user.email, name: user.name });
};
