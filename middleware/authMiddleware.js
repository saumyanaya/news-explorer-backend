const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return next(); // Add return statement
};

module.exports = authMiddleware;
